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

  getProfileInvestors(id:string) {
    return this.http.get(`${this.api}/admin/investor-profile/${id}`);
  }

  getProfileFounder(id:string) {
    return this.http.get(`${this.api}/admin/founder-profile/${id}`);
  }

  updateInvestorProfile(data:any) {
    return this.http.put(`${this.api}/investor/profile`,data);
  }
  
}
