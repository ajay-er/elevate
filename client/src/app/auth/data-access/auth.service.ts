import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ILogin, ISignup } from 'src/app/shared/interfaces';
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

  verifyEmail(email: { email: string }): Observable<any> {
    return this.http.post('/api/auth/verify-email', email);
  }
  
  verifyOtp(otp: { otp: string }): Observable<any> {
    return this.http.post('/api/auth/verify-otp', otp);
  }
}
