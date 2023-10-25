import { Schema } from "mongoose";


// An interface that describes the properties
// that are requried to create a new User
export interface UserAttrs {
	userName: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	phone?: string;
	otp?: string;
	profileImgUrl?: string;
	bankDetails?: Array<{ bankName: string; accountNumber: string }>;
	investments?: Array<{ investmentType: string; amount: number }>;
	founderOf?: Array<{ organization: string; role: string }>;
	blogs?: Array<{ title: string; content: string }>;
	address?: Array<Schema.Types.ObjectId>;
	followers?: Array<Schema.Types.ObjectId>;
	following?: Array<Schema.Types.ObjectId>;
	ideasCreated?: Array<Schema.Types.ObjectId>;
	messages?: Array<{
		sender: Schema.Types.ObjectId;
		message: string;
	}>;
}




  //auth
export interface IUser {
	id: string;
	name: string;
	email: string;
	photo?: string;
}

export interface ISignupUser{
	email:string,
	password?:string,
	firstName:string,
	lastName?:string,
}

export interface ILoginUser{
	email:string,
	password:string,
}

export interface MailInterface {
  from?: string;
  to: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  subject: string;
  text?: string;
  html: string;
}