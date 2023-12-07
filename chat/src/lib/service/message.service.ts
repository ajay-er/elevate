import { autoInjectable } from 'tsyringe';
import { MessageRepository } from '../database/repository/message.repository';

@autoInjectable()
export class MessageService {
    constructor(private readonly messageRepo:MessageRepository) {}
   
    async addMessage(sender:string, recipient:string, text:string) { 
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
