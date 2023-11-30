import { NgModule } from '@angular/core';
import { FoundersContainerRoutingModule } from './founders-container-routing.module';
import { FoundersContainerComponent } from './founders-container.component';
import { TableModule } from 'src/app/shared/ui/table/table.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [FoundersContainerComponent],
  imports: [
    CommonModule,
    FoundersContainerRoutingModule,
    TableModule,
  ],
})
export class FoundersContainerModule {}
