import { IRole } from '@ajay404/elevate';
import { Message } from '../model/Message';
import mongoose from 'mongoose';

export class MessageRepository {
    async addMessage(sender: string, recipient: string, text: string) {
        const message =  await Message.create(
            {
                text,
                users: [sender, recipient],
                sender,
            }
        );
        return message.populate({
            select:'userId',
            path:'sender'
        });
    }

    async getChatList(id: string,currentRole:IRole) {
        const objId = new mongoose.Types.ObjectId(id);
        return await Message.aggregate([
            { $match: { users: objId } },
            { $unwind: '$users' },
            { $match: {'users': { $ne: objId } } },
            {
                $group: {
                    _id: null,
                    otherUserIds: { $addToSet: '$users' }
                }
            },
            {
                $lookup: {
                    from: 'users', 
                    localField: 'otherUserIds',
                    foreignField: '_id',
                    as: 'otherUsers'
                }
            },
            {
                $project: {
                    otherUsers: {
                        $filter: {
                            input: '$otherUsers',
                            as: 'user',
                            cond: { $ne: ['$$user.role', currentRole] }
                        }
                    },
                    _id: 0
                }
            }
        ]);
    }

    async chatDetails(participant: string, userId: string) {
        return await Message.find({ users: { $all: [participant, userId] } })
            .sort({ createdAt: 1 })
            .populate('sender', 'userId');
    }
}
