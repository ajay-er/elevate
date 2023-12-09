import express from 'express';
import { investorController } from '../controllers/investor.controller';
import { upload } from '../../config/multer.config';
import { requireAuth } from '@ajay404/elevate';

const router = express.Router();

router.get('/api/v1/investor/investors', investorController.getAllInvestors);

// // for founders
// router.get(
//     '/api/v1/investor/profile/:id',
//     investorController.getInvestorProfile
// );
 
// for investors - their own profile
router.get('/api/v1/investor/investor-profile', requireAuth,
    investorController.getInvestorDetails);

router.put(
    '/api/v1/investor/profile-img', requireAuth ,upload.single('profile'),
    investorController.updateProfileImage
);

router.put(
    '/api/v1/investor/profile', requireAuth,
    investorController.updateProfile
);


export { router as investorRoute };
