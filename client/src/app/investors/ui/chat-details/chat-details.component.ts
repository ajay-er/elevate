import { Component, Input, inject } from '@angular/core';
import { ChatDetailsService } from '../../data-access/shared.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-details',
  templateUrl: './chat-details.component.html',
  styleUrls: ['./chat-details.component.css'],
})
export class ChatDetailsComponent {
  @Input() msgs: any = [];
  protected message: string = '';
  private chatHistorySubscription: Subscription | undefined;
  private routeParamsSubscription: Subscription | undefined;
  protected participant:any;
  protected participantId:any = '';

  private chatService = inject(ChatDetailsService);
  private route = inject(ActivatedRoute);

  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }

  ngOnInit() {
    this.routeParamsSubscription = this.route.params.subscribe((params) => {
      this.participantId = params['id'];
      this.chatService.setCurrentParticipent(this.participantId);
    });

    this.chatHistorySubscription =  this.chatService.getChatHistory().subscribe((chat) => {
      this.msgs = chat.messages;  
      console.log(this.msgs);
      this.participant = chat.participant;      
    });
  }

  isSendByUser(msg:any) {
    return msg.sender.id !== this.participantId;
  }

  ngOnDestroy() {
    if (this.chatHistorySubscription) {
      this.chatHistorySubscription.unsubscribe();
    }
    if (this.routeParamsSubscription) {
      this.routeParamsSubscription.unsubscribe();
    }
  }
}
