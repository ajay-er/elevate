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
