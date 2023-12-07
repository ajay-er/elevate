import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChatService } from 'src/app/shared/data-access/message.service';
import { InvestorsService } from './investors.service';

@Injectable({
  providedIn: 'root',
})
export class ChatDetailsService {
  private participantId = new BehaviorSubject<string>('');
  private currentUserId = new BehaviorSubject<string>('');
  private chatHistory = new BehaviorSubject<any>([]);
  private chatService = inject(ChatService);
  private investorService = inject(InvestorsService);

  setCurrentParticipent(participantId: string) {
    this.participantId.next(participantId);
    this.fetchChatHistory();
  }

  fetchChatHistory() {
    const participantId = this.participantId.getValue();
    this.investorService.getChatHistory(participantId).subscribe((res:any) => {
      this.chatHistory.next(res.history);
    });
  }

  getChatHistory():Observable<any> {
    return this.chatHistory.asObservable();
  }


  setCurrentUser(user: string) {
    this.currentUserId.next(user);
  }

  sendMessage(msg: string) {
    const participantId = this.participantId.getValue();
    const senderId = this.currentUserId.getValue();
    this.chatService.sendMessage({
      recipient: participantId,
      sender: senderId,
      text: msg,
    });
  }
}
