/* eslint-disable space-unary-ops */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AdminService } from '../service/admin.service';
import { UserService } from '../service/user.service';
import { BadRequestError } from '@ajay404/elevate';

const adminService = container.resolve(AdminService);
const usersService = container.resolve(UserService);

export class AdminController {

    async getAllInvestors(req: Request, res: Response) {
        const page = Number(req.query.page) || 1;
        const limit =  Number(req.query.limit) || 10;

        const result =  await adminService.findAllInvestors(page,limit);
        res.json({result});
    }

    async getAllFounders(req: Request, res: Response) {
        const page = Number(req.query.page) || 1;
        const limit =  Number(req.query.limit) || 10;

        const result =  await usersService.findAll(page,limit);
        res.json({result});
    }

    async getInvestorProfile(req: Request, res: Response) {
        const id = req.params.id;

        const investor = await adminService.findUserById(id);
        res.json({investor});
    }

    async getFounderProfile(req: Request, res: Response) {
        const userId = req.params.id;
        const founder = await usersService.findById(userId);
        if (!founder) throw new BadRequestError('Oops user not found');
        res.json({founder});
    }

}

export const adminController = new AdminController();
