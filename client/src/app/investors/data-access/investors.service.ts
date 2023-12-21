import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InvestorsService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getAllInvestors(page:number) {
    return this.http.get(`${this.apiUrl}/investor/investors?page=${page}`);
  }

  updateProfileImage(imageData: FormData) {
    return this.http.put(`${this.apiUrl}/investor/profile-img`, imageData);
  }

  getInvestorDetails(id:string) {
    return this.http.get(`${this.apiUrl}/investor/profile/${id}`);
  }

  getAllChatList() {
    return this.http.get(`${this.apiUrl}/chat/chatList`);
  }

  getChatHistory(participantId:string) {
    return this.http.get(`${this.apiUrl}/chat/history/${participantId}`);
  }
}
