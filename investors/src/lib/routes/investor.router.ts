import express from 'express';
import { investorController } from '../controllers/investor.controller';

const router = express.Router();


router.get('/api/v1/investor/investors', investorController.getAllInvestors);

router.get(
    '/api/v1/investor/profile/:id',
    investorController.getInvestorProfile
);

export { router as investorRoute };
