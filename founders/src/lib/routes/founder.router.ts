import express from 'express';
import { founderController } from '../controllers/founder.controller';
import { requireAuth } from '@ajay404/elevate';

const router = express.Router();

router.get('/api/v1/founder/all-subscriptions',requireAuth,founderController.getAllUserSubscriptions);

export { router as foundersRoute }; 
