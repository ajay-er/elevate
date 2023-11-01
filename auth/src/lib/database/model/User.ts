import mongoose from "mongoose";
import { Password } from "../../service/password.service";
import { UserAttrs } from "../../interfaces";

// An interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
	build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
	userName?: string;
	firstName?: string;
	lastName?: string;
	email: string;
	phone?: string;
	password: string;
	otp?: string;
	profileImgUrl?: string;
	isEmailVerified: boolean;
}

const userSchema = new mongoose.Schema(
	{
		userName: String,
		firstName: String,
		lastName: String,
		email: String,
		phone: String,
		password: String,
		otp: String,
		profileImgUrl: String,
		isEmailVerified: {
			type: Boolean,
			default: false
		}
	},
	{
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id;
				delete ret._id;
				delete ret.password;
				delete ret.__v;
			}
		},
		timestamps: true
	}
);

userSchema.pre("save", async function (next) {
	if (this.isModified("password")) {
		const hashed = await Password.toHash(this.get("password")!);
		this.set("password", hashed);
	}
	next();
});

userSchema.statics.build = (attrs: UserAttrs) => {
	return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };