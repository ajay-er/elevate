import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IConfirmPass,
  ILogin,
  ISignup,
  IVerifyOTP,
} from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private authApi = environment.apiUrl;

  sendGoogleToken(data: string): Observable<any> {
    return this.http.post(`${this.authApi}/auth/googleauth`, { googleToken: data });
  }

  signup(signupData: ISignup): Observable<any> {
    return this.http.post(`${this.authApi}/auth/signup`, signupData);
  }

  login(loginData: ILogin): Observable<any> {
    return this.http.post(`${this.authApi}/auth/login`, loginData);
  }

  forgotPass(email: { email: string }): Observable<any> {
    return this.http.post(`${this.authApi}/auth/forgot-password`, email);
  }

  verifyOtp(otp: IVerifyOTP): Observable<any> {
    return this.http.post(`${this.authApi}/auth/verify-otp`, otp);
  }

  resendOtp(data: { email: string }): Observable<any> {
    return this.http.post(`${this.authApi}/auth/resend-otp`, data);
  }

  logout(): Observable<any> {
    return this.http.post(`${this.authApi}/auth/logout`, {});
  }

  checkTokenValidation(token: string): Observable<any> {
    return this.http.post(`${this.authApi}/auth/reset-password`, { token });
  }

  confirmPassWord(data: IConfirmPass): Observable<any> {
    return this.http.post(`${this.authApi}/auth/confirm-password`, data);
  }

  adminLogin(data: ILogin): Observable<any> {
    return this.http.post(`${this.authApi}/auth/admin-login`, data);
  }
}
