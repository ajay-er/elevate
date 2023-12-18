import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { MessageService } from '../service/message.service';
import { BadRequestError, IRole, UnAuthorizedError } from '@ajay404/elevate';
import { UserService } from '../service/user.service';

const messageService = container.resolve(MessageService);
const userService = container.resolve(UserService);

export class MesssageController {
    async chatList(req: Request, res: Response) {
        const userId = req.currentUser?.id;
        if (!userId) throw new UnAuthorizedError();

        const currentUser = await userService.findUserById(userId);
        if (!currentUser) throw new BadRequestError('User not found');
        let currespondParticipants;
        if (currentUser.role === IRole.INVESTOR) {
            currespondParticipants = await userService.findInvestors(
                currentUser.userId
            );
        }

        if (currentUser.role === IRole.FOUNDER) {
            currespondParticipants = await userService.findFounders(
                currentUser.userId
            );
        }
        //if current user is founder. then payed users can message some investors.so that need to fetch.
        const remainingChat = await messageService.getChatListOfUser(
            currentUser.id,
            currentUser.role 
        );        
        let chat;
        if (remainingChat.length > 0) {
            chat = currespondParticipants?.concat(remainingChat[0]?.otherUsers);
        } else {
            chat = currespondParticipants;
        }
        
        res.json({ chat ,currentUserId:currentUser.userId });
    }

    async chatHistory(req: Request, res: Response) {
        const participantId = req.params.participantId;
        const userId = req.currentUser?.id;
        if (!userId) throw new UnAuthorizedError();
        const participant = await userService.findUserById(participantId);
        if (!participant) throw new BadRequestError('participant not found');
        const currentUser = await userService.findUserById(userId);
        if (!currentUser) throw new BadRequestError('User not found');

        const messages = await messageService.getChatHistory(
            participant.id,
            currentUser.id
        );
        res.json({ history: { messages, participant } });
    }
}

export const messageController = new MesssageController();
