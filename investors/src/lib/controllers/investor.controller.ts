import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { InvestorService } from '../service/investor.service';
import { cloudinary } from '../../config/cloudinary.config';
import { UserService } from '../service/user.service';
import { BadRequestError, UnAuthorizedError } from '@ajay404/elevate';
import { USER_UPDATED_PUBLISHER } from '../../events/publisher/user.updated.publisher';
import { kafka_client } from '../../config/kafka.config';
import { IUser } from '../database/model/User';

const investorService = container.resolve(InvestorService);
const userService = container.resolve(UserService);

export class InvestorController {

    async getAllInvestors(req: Request, res: Response) {
        const result = await investorService.get();
        res.status(200).json({ result });
    }

    async getInvestorProfile(req: Request, res: Response) {
        const id = req.params.id;
        const result = await investorService.findById(id);
        res.status(200).json({ result });
    }
    
    async getInvestorDetails(req: Request, res: Response) {
        const id = req.currentUser?.id;
        if (!id) throw new UnAuthorizedError();
        const user = await userService.findUserById(id);
        if (!user) throw new BadRequestError('oops user not found');
        const result = await investorService.findByUserId(user.id);
        res.status(200).json({ result , user});
    }
    
    async updateProfileImage(req: Request, res: Response) {
        const userId = req.currentUser?.id;
        if (!userId) throw new UnAuthorizedError();
        const user = await userService.findUserById(userId);
        if (!user) throw new BadRequestError('user not found');

        const image = req?.file;
        const path = image?.path;
        const cloudinaryResponse = await cloudinary.uploader.upload(path!, {
            secure: true,
            folder: 'elevate/investors',
            unique_filename: true,
        });
        const url = cloudinaryResponse.secure_url;
        await userService.update(userId,{profileImgUrl:url} as IUser);
        await new USER_UPDATED_PUBLISHER(kafka_client).publish({
            userId: user.userId,
            profileImgUrl: url,
        });
        res.json({message:'profile image updated successfully',url});
    }

    async updateProfile(req: Request, res: Response) {
        const userId = req.currentUser?.id;
        if (!userId) throw new UnAuthorizedError();
        const user = await userService.findUserById(userId);
        if (!user) throw new BadRequestError('user not found');
        const {firstName,lastName } = req.body;
        const {phone,website,bio,twitter,facebook,youtube,linkedin,investmentAmount,totalInvestmentCount } = req.body;
        await userService.update(userId,{firstName,lastName});
        const r = await investorService.update(user.id,{socialMediaLinks:{twitter,linkedin,facebook,youtube},investmentAmount,totalInvestmentCount,phone,website,bio});
        console.log(r,'this is updated');
        res.json({message:'Investor profile updated successfully'});
    }
}

export const investorController = new InvestorController();
