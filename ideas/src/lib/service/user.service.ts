import { autoInjectable } from 'tsyringe';
import { UserRepository } from '../database/repository/user.repository';
import { IUser } from '../database/model/User';

@autoInjectable()
export class UserService {
    constructor(private readonly userRepo: UserRepository) {}

    public async findUserById(userId:string):Promise<IUser | null> {
        return await this.userRepo.findUser(userId);
    }
   
}
