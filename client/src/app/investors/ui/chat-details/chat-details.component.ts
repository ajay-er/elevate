import { Component, ElementRef, Input, ViewChild, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/shared/data-access/message.service';
import { InvestorsService } from '../../data-access/investors.service';

@Component({
  selector: 'app-chat-details',
  templateUrl: './chat-details.component.html',
  styleUrls: ['./chat-details.component.css'],
})
export class ChatDetailsComponent {
  @Input() msgs: any = [];
  protected message: string = '';
  private routeParamsSubscription: Subscription | undefined;
  private chatHistorySubscription: Subscription | undefined;
  protected participant:any;
  protected participantId:any = '';
  container!: HTMLElement;          

  private chatService = inject(ChatService);
  private investorService = inject(InvestorsService);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.routeParamsSubscription = this.route.params.subscribe((params) => {
      this.participantId = params['id'];
      this.chatService.setCurrentParticipent(this.participantId);
      this.investorService.getChatHistory(this.participantId).subscribe((res:any) => { 
        this.chatService.setChatHistory(res.history);             
        this.participant = res.history.participant;  
      });
    });

    this.chatHistorySubscription =  this.chatService.getChatHistory().subscribe((chat) => {
      this.msgs = chat.messages;        
    });
  }

  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }

  isSendByUser(msg:any) {
    return msg.sender.userId === this.chatService.getCurrentUserId();
  }

  ngOnDestroy() {
    if (this.routeParamsSubscription) {
      this.routeParamsSubscription.unsubscribe();
    }
    if (this.chatHistorySubscription) {
      this.chatHistorySubscription.unsubscribe();
    }
  }
  //sroll
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { 
      console.log(err);
    }
  }
}
