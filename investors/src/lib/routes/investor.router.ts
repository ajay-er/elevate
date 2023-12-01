import express from 'express';
import { investorController } from '../controllers/investor.controller';
import { requireAuth } from '@ajay404/elevate';

const router = express.Router();

router.post(
    '/api/v1/investor/complete-details',
    requireAuth,
    investorController.updateInvestorDetails
);

router.get('/api/v1/investor/investors', investorController.getAllInvestors);

router.get(
    '/api/v1/investor/profile/:id',
    investorController.getInvestorProfile
);

export { router as investorRoute };
