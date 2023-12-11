import { IRole } from '../types';

export interface ISignup {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IVerifyOTP {
  otp: string;
  email?: string;
}

export interface IConfirmPass {
  newPassword: string;
  token: string;
}

export interface IUserProfile {
  name: string;
  lastName?: string;
  email: string;
  phone?: string;
  photo?: string;
  address?: any;
}

export interface IUpdateName {
  firstName: string;
  lastName: string;
}
export interface IUpdatePhone {
  phone: string;
}
export interface IUpdateImage {
  photo: string;
}

export interface IAddress {
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface UserDoc {
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

export interface IFounder {
  name: string;
  role: string;
}


export interface IJwtPayload {
  id: string;
  name: string;
  email: string;
  profileImgUrl: string;
  isEmailVerified: boolean;
  role: IRole;
  iat?: string;
  exp?: string;
}

export enum PlanType {
  BASIC = 'BASIC',
  PRO = 'PRO',
  PREMIUM = 'PREMIUM',
}

export interface IUser {
  userId: string;
  firstName: string;
  lastName: string;
  profileImgUrl: string;
  email: string;
  role: IRole;
}

export interface IIdeaComment {
  user: IUser;
  text: string;
}

export interface IIdea {
  id: string;
  user: IUser;
  caption: string;
  image?: string;
  likes?: string[];
  dislikes?: string[];
  comments?: IIdeaComment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IMessage {
  sender: string;
  recipient: string;
  text: string;
}


export interface Countries {
  code:string,
  code3:string,
  name:string,
  number:string,
  selected?: boolean;
}


export interface Technology {
  name: string;
  category: string;
  description: string;
  selected?: boolean;
}


interface SocialMediaLinks {
  twitter: string;
  linkedin: string;
  facebook: string;
  youtube: string;
}

export interface IInvestorData {
  bio: string;
  createdAt: string;
  id: string;
  investmentAmount: string;
  investmentLocations: string[]; 
  investmentMarkets: string[]; 
  isVerified: boolean;
  phone: string;
  socialMediaLinks: SocialMediaLinks;
  totalInvestmentCount: number;
  updatedAt: string;
  user: any;
  website: string;
}