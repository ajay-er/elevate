import { IRole } from '@ajay404/elevate';
import { Message } from '../model/Message';

export class MessageRepository {
    async addMessage(sender: string, recipient: string, text: string) {
        return await Message.create(
            {
                text,
                users: [sender, recipient],
                sender,
            }
        );
    }

    async getChatList(id: string,currentRole:IRole) {
        return await Message.aggregate([
            { $match: { users: id } },
            { $unwind: '$users' },
            { $match: { 'users.role': { $ne: currentRole } } },
            { $group: { _id: null, users: { $addToSet: '$users' } } }
        ]);
    }

    async chatDetails(participant: string, userId: string) {
        return await Message.find({ users: { $all: [participant, userId] } })
            .sort({ createdAt: 1 })
            .populate('sender', 'firstName');
    }
}
