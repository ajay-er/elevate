import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  
  getStartups() {
    return this.http.get(`${this.apiUrl}/startups/startups`);
  }

  getInvestors() {
    return this.http.get(`${this.apiUrl}/investor/investors`);
  }
}
