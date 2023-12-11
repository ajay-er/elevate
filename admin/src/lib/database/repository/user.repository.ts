import { IRole } from '@ajay404/elevate';
import { IUser, User } from '../model/User';

export class UserRepository {

    public async findUser(userId:string):Promise<IUser | null> {
        return await User.findOne({userId});
    }

    public async findById(id:string):Promise<IUser | null> {
        return await User.findById({_id:id});
    }
    
    public async createUser(user:IUser) {
        return await User.create(user);
    }
    
    public async update(userId:string,user:IUser) {
        return await User.updateOne({userId},user);
    }
    
    public async findAll(page:number,limit:number) {
        const skip = (page - 1) * limit;
        return await User.find({role:IRole.FOUNDER}).skip(skip).limit(limit).exec();
    }
}
