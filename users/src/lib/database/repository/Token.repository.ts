import { IToken } from "../../interfaces";
import Token from "../model/Token";

export class TokenRepository {
	async createNew(token: IToken): Promise<any> {
		return await Token.create(token);
	}
	async findByEmail(email: string): Promise<any> {
		return await Token.findOne({ email });
	}
	async findByEmailAndToken(email: string, token: string): Promise<any> {
		return await Token.findOne({ email, token });
	}

	async deleteByEmail(email: string): Promise<any> {
		return await Token.deleteOne({ email });
	}
}
