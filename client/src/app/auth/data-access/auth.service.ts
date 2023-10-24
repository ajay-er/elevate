import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  post(data: string) {
    this.http
      .post('/api/auth/googleauth', { googleToken: data })
      .subscribe((res) => {
        console.log(res);
      });
  }
}
