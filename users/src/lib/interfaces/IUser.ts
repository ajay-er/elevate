import { Schema } from "mongoose";

interface BankDetail {
    bankName: string;
    accountNumber: string;
  }
  
  interface Investment {
    investmentType: string;
    amount: number;
  }
  
  interface FounderRole {
    organization: string;
    role: string;
  }
  
  interface Blog {
    title: string;
    content: string;
  }
  
  interface Address {
    // Assuming the referenced type is "User"
    type: Schema.Types.ObjectId;
    ref: 'User';
  }
  
  interface Follower {
    // Assuming the referenced type is "User"
    type: Schema.Types.ObjectId;
    ref: 'User';
  }
  
  interface Following {
    // Assuming the referenced type is "User"
    type: Schema.Types.ObjectId;
    ref: 'User';
  }
  
  interface Idea {
    // Assuming the referenced type is "Idea"
    type: Schema.Types.ObjectId;
    ref: 'Idea';
  }
  
  interface Message {
    sender: {
      // Assuming the referenced type is "User"
      type: Schema.Types.ObjectId;
      ref: 'User';
    };
    message: string;
  }
  
  // Main User interface
  export interface IUser {
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    profileImgUrl: string;
    bankDetails: BankDetail[];
    investments: Investment[];
    founderOf: FounderRole[];
    blogs: Blog[];
    address: Address[];
    followers: Follower[];
    following: Following[];
    ideasCreated: Idea[];
    messages: Message[];
  }