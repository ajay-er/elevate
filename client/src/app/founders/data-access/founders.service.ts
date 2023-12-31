import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FoundersService {
  private http = inject(HttpClient);
  private api = environment.apiUrl;

  createSubscription(plan: string) {
    return this.http.post(`${this.api}/founder/payment/razorpay-order`, {
      plan,
    });
  }

  updateSubscription(data:any) {
    return this.http.post(`${this.api}/founder/payment/razorpay-verification`, {
      data,
    });
  }
  subscriptionPaymentFailed(data:any) {
    return this.http.post(`${this.api}/founder/payment/failed`, {
      data,
    });
  }

  getAllChatList() {
    return this.http.get(`${this.api}/chat/chatList`);
  }

  getChatHistory(participantId:string) {
    return this.http.get(`${this.api}/chat/history/${participantId}`);
  }

  getAllSubscriptions() {
    return this.http.get(`${this.api}/founder/all-subscriptions`);
  }
}
