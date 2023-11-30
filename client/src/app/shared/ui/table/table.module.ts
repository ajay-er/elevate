import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { PaginationModule } from '../pagination/pagination.module';

@NgModule({
  declarations: [TableComponent],
  imports: [CommonModule,PaginationModule],
  exports: [TableComponent],
})
export class TableModule {}
