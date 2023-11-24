import { autoInjectable } from 'tsyringe';
import { UserRepository } from '../database/repository/User.repository';
import { verifyGoogleOAuth2 } from '@ajay404/elevate';
import { ISignupUser, IUpdateUser } from '../interfaces';
import { UserDoc } from '../database/model/User';

@autoInjectable()
export class AuthService {
    constructor(private readonly userRepo: UserRepository) {}

    public async verifyOauthToken(googleToken: string, token: string) {
        return await verifyGoogleOAuth2(googleToken, token);
    }

    public async findUserByEmail(email: string) {
        return await this.userRepo.findByEmail(email);
    }

    public async signup(user: ISignupUser) {
        return await this.userRepo.signup(user);
    }

    public async update(user: IUpdateUser) {
        return await this.userRepo.update(user);
    }

    public async updateUser(email: string, user: ISignupUser) {
        return await this.userRepo.updateUser(email, user);
    }

    public async saveUser(user: UserDoc) {
        return await this.userRepo.save(user);
    }

    public async updatePasswordByEmail(email: string, newPassword: string) {
        return await this.userRepo.updatePasswordByEmail(email, newPassword);
    }
	
    public async updateData(email: string, user: Partial<UserDoc>) {
        return await this.userRepo.updateData(email, user);
    }
}
