import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private http = inject(HttpClient);
  private startupApi = environment.apiUrl_startups;
  private investorApi = environment.apiUrl_investors;
  
  getStartups() {
    return this.http.get(`${this.startupApi}/startups/startups`);
  }

  getInvestors() {
    return this.http.get(`${this.investorApi}/investor/investors`);
  }
}
