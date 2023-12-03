import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FounderService } from '../service/founder.service';

const founderService = container.resolve(FounderService);

class FounderController {
    async ok(req: Request, res: Response) {
    }
}
export const founderController = new FounderController();
