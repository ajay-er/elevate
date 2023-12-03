import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { InvestorService } from '../service/investor.service';

const investorService = container.resolve(InvestorService);

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
}

export const investorController = new InvestorController();
