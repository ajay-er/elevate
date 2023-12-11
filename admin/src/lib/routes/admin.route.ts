import express from 'express';
import { requireAdminAuth } from '@ajay404/elevate';
import { adminController } from '../controllers/admin.controller';

const router = express.Router();

router.get('/api/v1/admin/all-investors',requireAdminAuth,adminController.getAllInvestors);


export { router as adminRoute };
