import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { MessageService } from '../service/message.service';

const messageService = container.resolve(MessageService);

export class MesssageController {

    async get(req: Request, res: Response) {
        res.status(200).json({ hi:'hi' });
    }

  
}

export const messageController = new MesssageController();
