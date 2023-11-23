import { ISignupUser, IUpdateUser } from "../../interfaces";
import { Password } from "../../service/password.service";
import { User, UserDoc } from "../model/User";

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

    async updatePasswordByEmail(email: string, password: string) {
        return await User.updateOne({ email }, { $set: { password } });
    }

    async updateUser(email: string, user: ISignupUser) {
        user.password = await Password.toHash(user.password!);
        return await User.findOneAndUpdate({ email }, { $set: user }, { new: true });
    }

    //TODO: change this to reusable one!
    async update(user: IUpdateUser) {
        return await User.findOneAndUpdate(
            { email: user.email },
            { $set: { email: user.email, name: user.name, profileImgUrl: user?.photo } },
            { new: true }
        );
    }

    async updateData(email: string, user: Partial<UserDoc>) {
        return await User.findOneAndUpdate({ email }, { $set: user }, { new: true });
    }

    async save(user: UserDoc) {
        return await user.save();
    }
}
