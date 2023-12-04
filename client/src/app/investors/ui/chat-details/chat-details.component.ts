import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-chat-details',
  templateUrl: './chat-details.component.html',
  styleUrls: ['./chat-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatDetailsComponent {
  @Output() send = new EventEmitter<string>();
  msg:string = '';
  sendMessage() { 
    this.send.emit(this.msg);
  }
}
