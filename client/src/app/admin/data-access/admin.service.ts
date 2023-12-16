import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  
  getLatestInvestors() {
    return this.http.get(`${this.apiUrl}/admin/all-investors`);
  }
  
  getUnverifiedInvestors() {
    return this.http.get(`${this.apiUrl}/admin/unverified-investors`);
  }

  getAllFounders() {
    return this.http.get(`${this.apiUrl}/admin/all-founders`);
  }

  verifyInvestor(id:string) {
    return this.http.put(`${this.apiUrl}/admin/verify-investor`,{investorId:id});
  }

  blockUser(userId:string) {
    return this.http.put(`${this.apiUrl}/admin/block-user`,{userId});
  }
}
