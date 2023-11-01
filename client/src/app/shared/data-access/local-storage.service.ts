import { Injectable, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private cookieService = inject(CookieService);

  saveKeys(data: any) {
    for (const key in data) {
      this.save(key, data[key]);
    }
  }

  save(key: string, value: string): void {
    window.localStorage.setItem(key, value);
  }

  get(key: string): string | null {
    return window.localStorage.getItem(key);
  }

  clear(): void {
    window.localStorage.clear();
  }

  getOtpVerifyTimeLimitToken(): string | null {
    return window.localStorage.getItem('verify_otp_timestamp');
  }

  setOtpVerifyTimeLimitToken() {
    window.localStorage.setItem(
      'verify_otp_timestamp',
      new Date().getTime().toString()
    );
  }

  getCookies() {
    console.log(this.cookieService.getAll());
  }
}
