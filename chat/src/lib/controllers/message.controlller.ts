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
        let  allUsers;
        if (currentUser.role === IRole.INVESTOR) {
            allUsers = await userService.findInvestors();
        }
        
        if (currentUser.role === IRole.FOUNDER) {
            allUsers = await userService.findFounders();
        }

        const filteredInvestors = allUsers?.filter(
            (investor) => investor.id !== currentUser.id
        );
        const chatList = await messageService.getChatListUserMessaged(
            currentUser.id
        );

        const participants = chatList.reduce((users, message) => {
            message.users.forEach((user: any) => {
                if (user.id.toString() !== currentUser.id) {
                    users.add(user);
                }
            });
            return users;
        }, new Set());

        const participantsArray = Array.from(participants);

        const uniqueInvestors = filteredInvestors?.filter(
            (investor) =>
                !participantsArray.some(
                    (participant: any) => participant.id === investor.id
                )
        );
        const chat = [...participantsArray, ...uniqueInvestors!];

        res.status(200).json({ chat: chat, currentUserId: currentUser.id });
    }

    async chatHistory(req: Request, res: Response) {
        const participantId = req.params.participantId;
        const userId = req.currentUser?.id;
        if (!userId) throw new UnAuthorizedError();
        const currentUser = await userService.findUserById(userId);
        if (!currentUser) throw new BadRequestError('User not found');

        const participant = await userService.findUser(participantId);
        const messages = await messageService.getChatHistory(participantId, currentUser.id);
        res.json({ history: { messages, participant } });
    }
}

export const messageController = new MesssageController();
