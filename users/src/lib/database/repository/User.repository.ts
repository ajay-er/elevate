import { ISignupUser, IUser } from "../../interfaces";
import { User } from "../model/User";

export class UserRepository {
	async findByEmail(email: string): Promise<any> {
		return await User.findOne({ email });
	}

	async signup(user: ISignupUser) {
		return await User.create(user);
	}

	async find() {
		return await User.find({});
	}

	async update(user: IUser) {
		return await User.updateOne({ email: user.email }, {$set:{ email: user.email, name: user.name, profileImgUrl: user?.photo }});
	}

	async updatePasswordByEmail(email: string, password: string) {
		return await User.updateOne({ email }, { $set: { password } });
	}
}
