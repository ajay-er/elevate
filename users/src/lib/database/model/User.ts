import mongoose, { Schema } from "mongoose";
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
	bankDetails?: Array<{
		bankName: string;
		accountNumber: string;
	}>;
	investments?: Array<{
		investmentType: string;
		amount: number;
	}>;
	founderOf?: Array<{
		organization: string;
		role: string;
	}>;
	blogs?: Array<{
		title: string;
		content: string;
	}>;
	address?: Array<Schema.Types.ObjectId>;
	followers?: Array<Schema.Types.ObjectId>;
	following?: Array<Schema.Types.ObjectId>;
	ideasCreated?: Array<Schema.Types.ObjectId>;
	messages?: Array<{
		sender: Schema.Types.ObjectId;
		message: string;
	}>;
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
		},
		bankDetails: [
			{
				bankName: String,
				accountNumber: String
			}
		],
		investments: [
			{
				investmentType: String,
				amount: Number
			}
		],
		founderOf: [
			{
				organization: String,
				role: String
			}
		],
		blogs: [
			{
				title: String,
				content: String
			}
		],
		address: [
			{
				type: Schema.Types.ObjectId,
				ref: "User"
			}
		],
		followers: [
			{
				type: Schema.Types.ObjectId,
				ref: "User"
			}
		],
		following: [
			{
				type: Schema.Types.ObjectId,
				ref: "User"
			}
		],
		ideasCreated: [
			{
				type: Schema.Types.ObjectId,
				ref: "Idea"
			}
		],
		messages: [
			{
				sender: {
					type: Schema.Types.ObjectId,
					ref: "User"
				},
				message: String
			}
		]
	},
	{
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id;
				delete ret._id;
				delete ret.password;
				delete ret.__v;
			}
		}
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
