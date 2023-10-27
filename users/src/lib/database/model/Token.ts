import mongoose, { Schema, Document } from "mongoose";

// Define the user schema
const tokenSchema = new Schema({
	email: {
		type: String,
		required: true
	},
	token: {
		type: String,
		required: true
	},
});


interface IToken extends Document {
	email: string;
	token: string;
}

// Create the User model
const TokenModel = mongoose.model<IToken>("Token", tokenSchema);

export default TokenModel;
