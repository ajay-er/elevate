import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InvestorsService {
  private http = inject(HttpClient);

  getAllInvestors(){
    return this.http.get('/wow/investor/investors')
  }

  getInvestorData(investorId:any){
    return this.http.get(`/wow/investor/profile/${investorId}`)
  }
}
