import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonApiService {
  private api = environment.apiUrl;
  private http = inject(HttpClient);

  getuserProfile() {
    return this.http.get(`${this.api}/investor/investor-profile`);
  }

  updateInvestorProfile(data:any) {
    return this.http.put(`${this.api}/investor/profile`,data);
  }
  
}
