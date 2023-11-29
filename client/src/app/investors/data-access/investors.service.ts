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

}
