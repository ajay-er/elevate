import express from 'express';
import { requireAdminAuth } from '@ajay404/elevate';
import { adminController } from '../controllers/admin.controller';

const router = express.Router();

router.get('/api/v1/admin/all-investors',requireAdminAuth,adminController.getAllInvestors);

router.get('/api/v1/admin/all-founders',requireAdminAuth,adminController.getAllFounders);

router.get('/api/v1/admin/investor-profile/:id',requireAdminAuth,adminController.getInvestorProfile);

router.get('/api/v1/admin/founder-profile/:id',requireAdminAuth,adminController.getFounderProfile);


export { router as adminRoute };
