import { Component, ElementRef, Input, ViewChild, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/shared/data-access/message.service';
import { FoundersService } from '../../data-access/founders.service';

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
  container!: HTMLElement;          


  private chatService = inject(ChatService);
  private fouderservice = inject(FoundersService);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.routeParamsSubscription = this.route.params.subscribe((params) => {
      this.participantId = params['id'];
      this.chatService.setCurrentParticipent(this.participantId);
      this.fouderservice.getChatHistory(this.participantId).subscribe((res:any) => {
        this.chatService.setChatHistory(res.history);
      });
    });

    this.chatHistorySubscription =  this.chatService.getChatHistory().subscribe((chat) => {
      this.msgs = chat.messages;        
      this.participant = chat.participant;      
    });
  }

  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }

  isSendByUser(msg:any) {
    if (msg.sender?.id) return msg.sender.id !== this.participantId;
    else return msg.sender !== this.participantId;
  }

  ngOnDestroy() {
    if (this.chatHistorySubscription) {
      this.chatHistorySubscription.unsubscribe();
    }
    if (this.routeParamsSubscription) {
      this.routeParamsSubscription.unsubscribe();
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
