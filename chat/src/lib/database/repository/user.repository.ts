import { IRole } from '@ajay404/elevate';
import { IUser, User } from '../model/User';

export class UserRepository {
    public async findUser(userId: string): Promise<IUser | null> {
        return await User.findOne({ userId });
    }

    public async findUserbyId(id: string): Promise<IUser | null> {
        return await User.findById({ _id: id });
    }

    public async createUser(user: IUser) {
        return await User.create(user);
    }

    public async findAllInvestors(currentUserId: string) {
        return await User.find({
            role: IRole.INVESTOR,
            userId: { $ne: currentUserId },
        });
    }

    public async findAllFounders(currentUserId: string) {
        return await User.find({
            role: IRole.FOUNDER,
            userId: { $ne: currentUserId },
        });
    }

    public async update(userId: string, user: IUser) {
        return await User.updateOne({ userId }, user);
    }
}
