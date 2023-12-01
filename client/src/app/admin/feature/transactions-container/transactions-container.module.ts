import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsContainerRoutingModule } from './transactions-container-routing.module';
import { TransactionsContainerComponent } from './transactions-container.component';
import { TableModule } from 'src/app/shared/ui/table/table.module';

@NgModule({
  declarations: [TransactionsContainerComponent],
  imports: [CommonModule, TransactionsContainerRoutingModule,TableModule],
})
export class TransactionsContainerModule {}
