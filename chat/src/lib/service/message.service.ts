import { autoInjectable } from 'tsyringe';
import { MessageRepository } from '../database/repository/message.repository';
import { BadRequestError } from '@ajay404/elevate';

@autoInjectable()
export class MessageService {
    constructor(private readonly messageRepo:MessageRepository) {}
   
    async addMessage(sender:string, recipient:string, text:string) { 
        if (!text) throw new BadRequestError('oops! you cant send empty message');
        return await this.messageRepo.addMessage(sender,recipient,text);
    }

    async getAllmessagesOfUser(userId:string) { 
        return await this.messageRepo.getAllMessages(userId);
    }

    async getChatListUserMessaged(userId:string) { 
        return await this.messageRepo.getChatList(userId);
    }

    async getChatHistory(participant:string,userId:string) { 
        return await this.messageRepo.chatDetails(participant,userId);
    }
}
