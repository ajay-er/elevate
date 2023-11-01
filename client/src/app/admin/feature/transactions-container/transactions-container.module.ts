import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsContainerRoutingModule } from './transactions-container-routing.module';
import { TransactionsContainerComponent } from './transactions-container.component';

@NgModule({
  declarations: [TransactionsContainerComponent],
  imports: [CommonModule, TransactionsContainerRoutingModule],
})
export class TransactionsContainerModule {}
