import express from 'express';
import { founderController } from '../controllers/founder.controller';
import { requireAuth } from '@ajay404/elevate';

const router = express.Router();

router.get('/api/v1/founder/all-subscriptions',requireAuth,founderController.getAllUserSubscriptions);

router.get('/api/v1/founder/admin-all-subscriptions',founderController.getAllUserSubscriptionsAdmin);

router.get('/api/v1/founder/subscription-count',requireAuth,founderController.getSubscriptionsCount);

router.get('/api/v1/founder/pending-subscription-count',requireAuth,founderController.getPendingSubscriptionCount);

router.get('/api/v1/founder/total-profit',requireAuth,founderController.findTotalProfit);

router.get('/api/v1/founder/chart-data',requireAuth,founderController.chartData);

router.get('/api/v1/founder/chart-two-data',requireAuth,founderController.chart2Data);

export { router as foundersRoute }; 
