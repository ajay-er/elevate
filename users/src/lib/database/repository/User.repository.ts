import { User } from "../model/User";

interface IUser {
	id: string;
	name: string;
	email: string;
	photo?: string;
}

interface ISignupUser{
	email:string,
	password?:string,
	firstName:string,
	lastName?:string,
}

export class UserRepository {
	async findByEmail(email: string): Promise<IUser | null> {
		return await User.findOne({ email });
	}

	async signup(user:ISignupUser) {
		const newUser = await User.create(user);
		newUser.save();
		return newUser;
	}

	async find() {
		return await User.find({});
	}

	async update(user: IUser) {
		return await User.updateOne({ email: user.email }, { email: user.email, name: user.name, profileImgUrl: user?.photo });
	}
}
