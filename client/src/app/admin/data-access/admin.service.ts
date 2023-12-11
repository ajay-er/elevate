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

  getAllFounders() {
    return this.http.get(`${this.apiUrl}/admin/all-founders`);
  }
  
}
