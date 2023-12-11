import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { PaginationModule } from '../pagination/pagination.module';
import { FormatInvestmentAmountPipe } from '../../resolvers/FormatInvestmentAmount.pipe';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TableComponent],
  imports: [CommonModule,PaginationModule,RouterModule,FormatInvestmentAmountPipe],
  exports: [TableComponent],
})
export class TableModule {}
