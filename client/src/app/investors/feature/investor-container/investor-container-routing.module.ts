import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvestorContainerComponent } from './investor-container.component';

const routes: Routes = [
  {
    path: '',
    component: InvestorContainerComponent,
    children: [
      {
        path: 'messages',
        loadChildren: () =>
          import('../messages/messages.module').then((m) => m.MessagesModule),
      },
      {
        path: 'ideas',
        loadChildren: () =>
          import('../ideas/ideas.module').then((m) => m.IdeasModule),
      },
      {
        path: '',
        redirectTo: 'ideas',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvestorContainerRoutingModule {}
