import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { InvestorService } from '../service/investor.service';
import { cloudinary } from '../../config/cloudinary.config';
import { UserService } from '../service/user.service';
import { BadRequestError, UnAuthorizedError } from '@ajay404/elevate';
import { USER_UPDATED_PUBLISHER } from '../../events/publisher/user.updated.publisher';
import { kafka_client } from '../../config/kafka.config';
import { IUser } from '../database/model/User';
import { INVESTOR_UPDATED_PUBLISHER } from '../../events/publisher/investor.updated.publisher';
import { PlanType, SubscriptionStatus } from '../interfaces';
import { PUT_TO_ELASTIC } from '../database/elasticsearch/elasticsearch.repository';

const investorService = container.resolve(InvestorService);
const userService = container.resolve(UserService);

export class InvestorController {
    async getAllInvestors(req: Request, res: Response) {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const result = await investorService.get(page, limit);

        res.status(200).json({ result });
    }

    async getInvestorProfile(req: Request, res: Response) {
        const currentUserId = req.currentUser?.id;
        const id = req.params.id;

        if (currentUserId) {
            const user = await userService.findUserById(currentUserId);
            if (!user) throw new BadRequestError('oops user not found');
            const subscription = user?.subscription;
            if (
                subscription?.status === SubscriptionStatus.ACTIVE &&
        subscription.plan === PlanType.BASIC
            ) {
                const investor = await investorService.findByIdBasicPlan(id);
                return res.status(200).json({ investor, subscription: PlanType.BASIC });
            }

            if (
                subscription?.status === SubscriptionStatus.ACTIVE &&
        subscription.plan === PlanType.PRO
            ) {
                const investor = await investorService.findByIdProPlan(id);
                return res.status(200).json({ investor, subscription: PlanType.PRO });
            }

            if (
                subscription?.status === SubscriptionStatus.ACTIVE &&
        subscription.plan === PlanType.PREMIUM
            ) {
                const investor = await investorService.findByIdPremiumPlan(id);
                return res
                    .status(200)
                    .json({ investor, subscription: PlanType.PREMIUM });
            }
        }

        const investor = await investorService.findByIdBasicPlan(id);
        if (!investor?.isVerified) {
            throw new BadRequestError('Investor is not verified');
        }
        res.status(200).json({ investor, subscription: 'NO-PLAN' });
    }

    async getInvestorDetails(req: Request, res: Response) {
        const id = req.currentUser?.id;
        if (!id) throw new UnAuthorizedError();
        const user = await userService.findUserById(id);
        if (!user) throw new BadRequestError('oops user not found');
        const result = await investorService.findByUserId(user.id);
        res.status(200).json({ result, user });
    }

    async getProfile(req: Request, res: Response) {
        const id = req.currentUser?.id;
        if (!id) throw new UnAuthorizedError();
        const user = await userService.findUserById(id);
        if (!user) throw new BadRequestError('oops user not found');
        const result = await investorService.findByUserId(user.id);
        res.status(200).json({ result, user });
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
        await userService.update(userId, { profileImgUrl: url } as IUser);
        await new USER_UPDATED_PUBLISHER(kafka_client).publish({
            userId: user.userId,
            profileImgUrl: url,
        });
        res.json({ message: 'profile image updated successfully', url });
    }

    async updateProfile(req: Request, res: Response) {
        const userId = req.currentUser?.id;
        if (!userId) throw new UnAuthorizedError();
        const user = await userService.findUserById(userId);
        if (!user) throw new BadRequestError('user not found');
        const { firstName, lastName } = req.body;
        const {
            phone,
            website,
            bio,
            twitter,
            facebook,
            youtube,
            linkedin,
            investmentAmount,
            totalInvestmentCount,
            countries,
            markets,
        } = req.body;
        await userService.update(userId, { firstName, lastName });

        await new USER_UPDATED_PUBLISHER(kafka_client).publish({
            firstName: user.firstName,
            lastName: user.lastName,
            userId: user.userId,
        });

        await investorService.update(user.id, {
            socialMediaLinks: { twitter, linkedin, facebook, youtube },
            investmentAmount,
            investmentLocations: countries,
            investmentMarkets: markets,
            totalInvestmentCount,
            phone,
            website,
            bio,
        });
        const investor = await investorService.findByUserId(user.id);
        if (!investor) throw new BadRequestError('Ooops investor not found');

        await new INVESTOR_UPDATED_PUBLISHER(kafka_client).publish({
            userId: user.userId,
            isVerified: investor.isVerified,
            socialMediaLinks: {
                twitter,
                facebook,
                youtube,
                linkedin,
            },
            investmentAmount,
            totalInvestmentCount,
            phone,
            website,
            bio,
            investmentLocations: countries,
            investmentMarkets: markets,
        });
                
        await PUT_TO_ELASTIC('investors', {
            investmentLocations: countries,
            investmentMarkets: markets,
            userId,
        });

        res.json({ message: 'Investor profile updated successfully', investor });
    }
}

export const investorController = new InvestorController();
