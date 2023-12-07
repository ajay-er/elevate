import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InvestorsService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getAllInvestors() {
    return this.http.get(`${this.apiUrl}/investor/investors`);
  }

  updateProfileImage(imageData: FormData) {
    return this.http.post(`${this.apiUrl}`, imageData);
  }

  getAllChatList() {
    return this.http.get(`${this.apiUrl}/chat/chatList`);
  }

  getChatHistory(participantId:string) {
    return this.http.get(`${this.apiUrl}/chat/history/${participantId}`);
  }
}
