/* eslint-disable space-unary-ops */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AdminService } from '../service/admin.service';

const adminService = container.resolve(AdminService);

export class AdminController {

    async getAllInvestors(req: Request, res: Response) {
        const page = Number(req.query.page) || 1;
        const limit =  Number(req.query.limit) || 10;

        const result =  await adminService.findAllInvestors(page,limit);
        res.json({result});
    }

}

export const adminController = new AdminController();
