import { ISignupUser } from "../../interfaces";
import UserSession from "../model/Session";

export class SessionRepository {
	async signup(user: ISignupUser) {
		return await UserSession.create(user);
	}

	async findByEmail(email: string): Promise<any> {
		return await UserSession.findOne({ email });
	}

	async delteByEmail(email: string): Promise<any> {
		return await UserSession.deleteOne({ email });
	}
}
