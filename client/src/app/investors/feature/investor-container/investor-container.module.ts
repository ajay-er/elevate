import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvestorContainerRoutingModule } from './investor-container-routing.module';
import { InvestorContainerComponent } from './investor-container.component';

@NgModule({
  declarations: [InvestorContainerComponent],
  imports: [CommonModule, InvestorContainerRoutingModule],
})
export class InvestorContainerModule {}
