import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FounderService } from '../service/founder.service';
import { BadRequestError, UnAuthorizedError } from '@ajay404/elevate';
import { UserService } from '../service/user.service';

const founderService = container.resolve(FounderService);
const userService = container.resolve(UserService);

class FounderController {
    async getAllUserSubscriptions(req: Request, res: Response) {
        const currentUserId = req.currentUser?.id;
        if (!currentUserId) throw new UnAuthorizedError();
        const user = await userService.findUserById(currentUserId);
        if (!user) throw new BadRequestError('oops user not found');
        const result = await founderService.getAllSubcriptions(user.id);
        res.json({result});
    } 
}

export const founderController = new FounderController();


//     await PUT_TO_ELASTIC('startups', {
//         companyName,
//         bannerImage,
//         description,
//         industry,
//         location,
//         id: result._id,
//     });
