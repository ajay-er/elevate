import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatDetailsComponent } from './chat-details.component';

@NgModule({
  declarations: [ChatDetailsComponent],
  imports: [CommonModule],
  exports:[ChatDetailsComponent]
})
export class ChatDetailsModule {}
