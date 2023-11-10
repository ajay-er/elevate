import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private http = inject(HttpClient);

  getStartups(){
    return this.http.get('/fou/founders/startups');
  }

  getInvestors(){
    return this.http.get('/wow/investor/investors');
  }
  
}
