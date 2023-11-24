import { autoInjectable } from 'tsyringe';
import { TokenRepository } from '../database/repository/Token.repository';
import { IToken } from '../interfaces';

@autoInjectable()
export class TokenService {
    constructor(private readonly tokenRepo: TokenRepository) {}

    public async createNew(token:IToken) {
        return this.tokenRepo.createNew(token);
    }

    public async findByEmailAndToken(email:string,token:string) {
        return this.tokenRepo.findByEmailAndToken(email,token);
    }
}
