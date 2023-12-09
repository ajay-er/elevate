import { autoInjectable } from 'tsyringe';
import { IUser } from '../database/model/User';
import { UserRepository } from '../database/repository/user.repository';

@autoInjectable()
export class UserService {
    constructor(private readonly userRepo: UserRepository) {}

    public async findUserById(userId:string):Promise<IUser | null> {
        return await this.userRepo.findUser(userId);
    }

    public async createUser(userData:IUser) {
        return await this.userRepo.createUser(userData);
    }

    public async update(userId:string,userData:Partial<IUser>) {
        return await this.userRepo.update(userId,userData);
    }
}
