import { Schema } from "mongoose";

// interface BankDetail {
//     bankName: string;
//     accountNumber: string;
//   }
  
//   interface Investment {
//     investmentType: string;
//     amount: number;
//   }
  
//   interface FounderRole {
//     organization: string;
//     role: string;
//   }
  
//   interface Blog {
//     title: string;
//     content: string;
//   }
  
//   interface Address {
//     // Assuming the referenced type is "User"
//     type: Schema.Types.ObjectId;
//     ref: 'User';
//   }
  
//   interface Follower {
//     // Assuming the referenced type is "User"
//     type: Schema.Types.ObjectId;
//     ref: 'User';
//   }
  
//   interface Following {
//     // Assuming the referenced type is "User"
//     type: Schema.Types.ObjectId;
//     ref: 'User';
//   }
  
//   interface Idea {
//     // Assuming the referenced type is "Idea"
//     type: Schema.Types.ObjectId;
//     ref: 'Idea';
//   }
  
//   interface Message {
//     sender: {
//       // Assuming the referenced type is "User"
//       type: Schema.Types.ObjectId;
//       ref: 'User';
//     };
//     message: string;
//   }
  
//   // Main User interface
//   export interface IUserAttrs {
// 	  _id: Schema.Types.ObjectId;
//     userName: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//     phone: string;
//     password: string;
//     otp?:string;
//     profileImgUrl: string;
//     bankDetails: BankDetail[];
//     investments: Investment[];
//     founderOf: FounderRole[];
//     blogs: Blog[];
//     address: Address[];
//     followers: Follower[];
//     following: Following[];
//     ideasCreated: Idea[];
//     messages: Message[];
//   }



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