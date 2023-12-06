import { autoInjectable } from 'tsyringe';
import { MessageRepository } from '../database/repository/message.repository';


@autoInjectable()
export class MessageService {
    constructor(private readonly messageRepo:MessageRepository) {}
   
    async addMessage(sender:string, recipient:string, text:string) { 
        return await this.messageRepo.addMessage(sender,recipient,text);
    }
}
