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
        await investorService.update(user.id,req.body);
       
        res.json({message:'Investor profile updated successfully'});
    }

}

export const investorController = new InvestorController();
