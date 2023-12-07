import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatDetailsComponent } from './chat-details.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ChatDetailsComponent],
  imports: [CommonModule,FormsModule],
  exports:[ChatDetailsComponent],
})
export class ChatDetailsModule {}
