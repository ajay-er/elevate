/* eslint-disable space-unary-ops */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AdminService } from '../service/admin.service';
import { UserService } from '../service/user.service';
import { BadRequestError } from '@ajay404/elevate';
import { USER_TOGGLE_BLOCK_PUBLISHER } from '../../events/publisher/user.blocktoogle.publisher';
import { kafka_client } from '../../config/kafka.config';

const adminService = container.resolve(AdminService);
const usersService = container.resolve(UserService);

export class AdminController {
    async getAllInvestors(req: Request, res: Response) {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const result = await adminService.findAllInvestors(page, limit);
        res.json({ result });
    }

    async getAllUnverifiedInvestors(req: Request, res: Response) {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const result = await adminService.findAllUnverifiedInvestors(page, limit);
        res.json({ result });
    }

    async verifyUser(req: Request, res: Response) {
        const { investorId } = req.body;
        const investor = await adminService.updateVerifyInvestor(investorId);
        res.json({ investor });
    }

    async getAllFounders(req: Request, res: Response) {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const result = await usersService.findAll(page, limit);
        res.json({ result });
    }

    async getInvestorProfile(req: Request, res: Response) {
        const id = req.params.id;

        const investor = await adminService.findUserById(id);
        res.json({ investor });
    }

    async getFounderProfile(req: Request, res: Response) {
        const userId = req.params.id;
        const founder = await usersService.findById(userId);
        if (!founder) throw new BadRequestError('Oops user not found');
        res.json({ founder });
    }

    async toggleBlockUser(req: Request, res: Response) {
        const userId = req.params.id;
        const user = await usersService.findUserById(userId);
        if (!user) throw new BadRequestError('Oops user not found');
        user.isBlocked = !user.isBlocked;
        const newUser = await user.save();

        await new USER_TOGGLE_BLOCK_PUBLISHER(kafka_client).publish({
            userId,
            isBlocked: newUser.isBlocked,
        });

        res.json({ user });
    }
}

export const adminController = new AdminController();
