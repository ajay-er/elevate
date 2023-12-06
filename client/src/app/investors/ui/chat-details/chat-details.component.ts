import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IMessage } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-chat-details',
  templateUrl: './chat-details.component.html',
  styleUrls: ['./chat-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatDetailsComponent {
  @Output() send = new EventEmitter<IMessage>();
  @Input() msgs:any = [];
  protected  msg:string = '';
  sendMessage() { 
    this.send.emit({sender:'user1',recipient:'user2',text:this.msg});
  }

  ngAfterViewInit() {
    console.log(this.msgs);
    
  }

}
