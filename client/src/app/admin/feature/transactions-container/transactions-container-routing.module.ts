import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionsContainerComponent } from './transactions-container.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionsContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionsContainerRoutingModule {}
