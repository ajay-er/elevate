import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvestorsService {
  private http = inject(HttpClient);
  private investorApi = environment.apiUrl_investors;

  getAllInvestors() {
    return this.http.get(`${this.investorApi}/investor/investors`);
  }

  getInvestorData(investorId:any) {
    return this.http.get(`${this.investorApi}/investor/profile/${investorId}`);
  }
}
