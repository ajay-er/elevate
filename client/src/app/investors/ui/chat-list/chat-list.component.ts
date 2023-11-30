import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatListComponent {

}
