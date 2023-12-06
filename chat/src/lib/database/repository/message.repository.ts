import { Message } from '../model/Message';

export class MessageRepository {

    async addMessage(sender:string, recipient:string, text:string) {
        return await Message.create({
            text,
            users:[sender,recipient],
            sender
        });
    }

}
