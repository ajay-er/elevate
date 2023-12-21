import { autoInjectable } from 'tsyringe';
import { UserRepository } from '../database/repository/user.repository';
import { IUser } from '../database/model/User';

@autoInjectable()
export class UserService {
    constructor(private readonly userRepo: UserRepository) {}

    public async findUserById(userId:string):Promise<IUser | null> {
        return await this.userRepo.findUser(userId);
    }

    public async findById(userId:any):Promise<IUser | null> {
        return await this.userRepo.findById(userId);
    }

    public async createUser(userData:IUser) {
        return await this.userRepo.createUser(userData);
    }

    public async update(userId:string,userData:Partial<IUser>) {
        return await this.userRepo.update(userId,userData);
    }

    public async findAll(page:number,limit:number) {
        return await this.userRepo.findAll(page,limit);
    }

    public async foundersCount() {
        return await this.userRepo.findFoundersCount();
    }
}
