import { BadRequestError, UnAuthorizedError, currentUser, requireAuth } from '@ajay404/elevate';
import express, { Request, Response } from 'express';
import { AuthService } from '../service/auth.service';
import { container } from 'tsyringe';
import { cloudinary } from '../../config/cloudinary.config';
import { upload } from '../../config/multer.config';
import { USER_UPDATED_PUBLISHER } from '../../events/publisher/user.updated.publisher';
import { kafka_client } from '../../config/kafka.config';

const router = express.Router();

router.use(currentUser);

const authService = container.resolve(AuthService);

router.get('/api/v1/auth/profile/get-profile', requireAuth, async (req: Request, res: Response) => {
    const email = req.currentUser?.email;
    const user = await authService.findUserByEmail(email!);
    res.status(200).json({user});
});

router.patch('/api/v1/auth/profile/update-name', requireAuth, async (req: Request, res: Response) => {
    const id = req.currentUser?.id;
    if (!id) throw new UnAuthorizedError();
    const user = await authService.findById(id!);
    if (!user) throw new BadRequestError('user not found');
    user.firstName = req.body.firstName;
    user.lastName = req.body?.lastName;
    authService.saveUser(user);
    res.status(200).json({ message: 'name updated successfully', user });
});

router.post('/api/v1/auth/profile/update-phone', requireAuth, async (req: Request, res: Response) => {
    const email = req.currentUser?.email;
    const user = await authService.updateData(email!, req.body);
    res.status(200).json({ message: 'phone updated successfully', user });
});

router.post('/api/v1/auth/profile/profile-img',upload.single('profile'), requireAuth, async (req: Request, res: Response) => {
    const id = req.currentUser?.id;
    if (!id) throw new UnAuthorizedError();
    const image = req?.file;
    const path = image?.path;
    const cloudinaryResponse = await cloudinary.uploader.upload(path!, {
        secure: true,
        folder: 'elevate/founders',
        unique_filename: true,
    });
    const url = cloudinaryResponse.secure_url;
    const user = await authService.findById(id);
    if (!user) throw new BadRequestError('User not found');
    user.profileImgUrl = url;
    authService.saveUser(user);

    await new USER_UPDATED_PUBLISHER(kafka_client).publish({
        profileImgUrl:url,
        userId:user.id,
    });
    res.status(200).json({ message: 'profile image updated successfully',url});
});

export { router as profileRoute };
