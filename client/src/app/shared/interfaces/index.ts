export interface ISignup {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
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

export interface IStartup {
  companyName: string;
  logo: File | null;
  bannerImage: File | null;
  description: string;
  industry: string;
  location: string;
  businessModel: string;
  foundingDate: string;
  targetAudience: string;
  solution: string;
  marketProblem: string;
  founders: IFounder[];
  fundingStatus: string;
  fundingAmount: string;
  totalEquityShares: string;
  exitStrategy: string;
  currentValuation: string;
  availableEquityShares: string;
  [key: string]: any;
}
