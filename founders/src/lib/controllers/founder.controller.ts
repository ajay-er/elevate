import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FounderService } from '../service/founder.service';

const founderService = container.resolve(FounderService);

class FounderController {
    async ok(req: Request, res: Response) {
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
