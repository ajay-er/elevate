import { IUser, User } from '../model/User';

export class UserRepository {

    public async findUser(userId:string):Promise<IUser | null> {
        return await User.findOne({userId});
    }
    
    public async createUser(user:IUser) {
        return await User.create(user);
    }
}
