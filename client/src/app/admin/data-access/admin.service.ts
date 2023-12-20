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
  
  getLatestFoundersCount() {
    return this.http.get(`${this.apiUrl}/admin/all-founders-count`);
  }
  
  totalSubscriptions() {
    return this.http.get(`${this.apiUrl}/founder/subscription-count`);
  }
  
  
  totalPendingSubscriptions() {
    return this.http.get(`${this.apiUrl}/founder/pending-subscription-count`);
  }
  
  totalProfit() {
    return this.http.get(`${this.apiUrl}/founder/total-profit`);
  }

  getVerifiedInvestorsCount() {
    return this.http.get(`${this.apiUrl}/admin/total-verfied-investors`);
  }

  getNotVerifiedInvestorsCount() {
    return this.http.get(`${this.apiUrl}/admin/total-not-verfied-investors`);
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
