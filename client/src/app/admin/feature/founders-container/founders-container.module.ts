import { NgModule } from '@angular/core';
import { FoundersContainerRoutingModule } from './founders-container-routing.module';
import { FoundersContainerComponent } from './founders-container.component';
import { TableModule } from 'src/app/shared/ui/table/table.module';

@NgModule({
  declarations: [FoundersContainerComponent],
  imports: [FoundersContainerRoutingModule,TableModule],
})
export class FoundersContainerModule {}
