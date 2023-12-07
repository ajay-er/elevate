import { IRole } from '@ajay404/elevate';
import { IUser, User } from '../model/User';

export class UserRepository {

    public async findUser(userId:string):Promise<IUser | null> {
        return await User.findOne({userId});
    }
    
    public async findUserbyId(id:string):Promise<IUser | null> {
        return await User.findById({_id:id});
    }
    
    public async createUser(user:IUser) {
        return await User.create(user);
    }
    
    public async findAllInvestors() {
        return await User.find({role:IRole.INVESTOR}).select('firstName profileImgUrl id role');
    }
}
