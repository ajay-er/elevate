import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IConfirmPass,
  ILogin,
  ISignup,
  IVerifyOTP,
} from 'src/app/shared/interfaces';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  sendGoogleToken(data: string): Observable<any> {
    return this.http.post('/api/auth/googleauth', { googleToken: data });
  }

  signup(signupData: ISignup): Observable<any> {
    return this.http.post('/api/auth/signup', signupData);
  }

  login(loginData: ILogin): Observable<any> {
    return this.http.post('/api/auth/login', loginData);
  }

  forgotPass(email: { email: string }): Observable<any> {
    return this.http.post('/api/auth/forgot-password', email);
  }

  verifyOtp(otp: IVerifyOTP): Observable<any> {
    return this.http.post('/api/auth/verify-otp', otp);
  }

  resendOtp(data: { email: string }): Observable<any> {
    return this.http.post('/api/auth/resend-otp', data);
  }

  logout(): Observable<any> {
    return this.http.post('/api/auth/logout', {});
  }

  checkTokenValidation(token: string): Observable<any> {
    return this.http.post('/api/auth/reset-password', { token });
  }

  confirmPassWord(data: IConfirmPass): Observable<any> {
    return this.http.post('/api/auth/confirm-password', data);
  }

  adminLogin(data: ILogin): Observable<any> {
    return this.http.post('/api/auth/admin-login', data);
  }
}
