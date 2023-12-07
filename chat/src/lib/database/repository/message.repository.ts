import { Message } from '../model/Message';

export class MessageRepository {
    async addMessage(sender: string, recipient: string, text: string) {
        return await Message.create({
            text,
            users: [sender, recipient],
            sender,
        });
    }

    async getAllMessages(userId: string) {
        return await Message.find({ users: userId }).populate('users');
    }

    async getChatList(userId: string) {
        return await Message.find({ users: userId }).populate(
            'users',
            'firstName email id role profileImgUrl'
        );
    }

    async chatDetails(participant: string, userId: string) {
        return await Message.find({ users: { $in: [participant, userId] } })
            .sort({ createdAt: 1 })
            .populate('sender', 'firstName');
    }
}
