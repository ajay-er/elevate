import { autoInjectable } from 'tsyringe';
import { MessageRepository } from '../database/repository/message.repository';
import { BadRequestError, IRole } from '@ajay404/elevate';

@autoInjectable()
export class MessageService {
    constructor(private readonly messageRepo:MessageRepository) {}
   
    async addMessage(sender:string, recipient:string, text:string) { 
        if (!text) throw new BadRequestError('oops! you cant send empty message');
        return await this.messageRepo.addMessage(sender,recipient,text);
    }

    async getChatListOfUser(id:string,currentRole:IRole) { 
        return await this.messageRepo.getChatList(id,currentRole);
    }

    async getChatHistory(participant:string,userId:string) { 
        return await this.messageRepo.chatDetails(participant,userId);
    }
}
