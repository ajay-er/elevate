import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvestorsService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getAllInvestors() {
    return this.http.get(`${this.apiUrl}/investor/investors`);
  }

  getInvestorData(investorId:any) {
    return this.http.get(`${this.apiUrl}/investor/profile/${investorId}`);
  }

  completeInvestorDetails(IInvestor:any) {
    return this.http.post(`${this.apiUrl}/investor/complete-details`,IInvestor);
  }
}
