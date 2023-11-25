import express, { Request, Response } from 'express';
import { container } from 'tsyringe';
import { InvestorService } from '../service/investor.service';
import { requireAuth } from '@ajay404/elevate';

const router = express.Router();

const investorService = container.resolve(InvestorService);

router.post(
    '/complete-details',
    requireAuth,
    async (req: Request, res: Response) => {
        const investorDetails = { email: req.currentUser?.email, ...req.body };
        const result = await investorService.updateData(investorDetails);
        res.status(200).json({ message: 'investor updated successfully', result });
    }
);

router.get('/investors', async (req: Request, res: Response) => {
    const result = await investorService.get();
    res.status(200).json({ result });
});

router.get('/profile/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await investorService.findById(id);
    res.status(200).json({ result });
});

export { router as investorRoute };
