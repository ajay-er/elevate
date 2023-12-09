import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessagesComponent } from './messages.component';
import { ChatDetailsComponent } from '../../ui/chat-details/chat-details.component';

const routes: Routes = [
  {
    path: '',
    component: MessagesComponent,
    children: [
      {
        path: ':id',
        component: ChatDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessagesRoutingModule {}
