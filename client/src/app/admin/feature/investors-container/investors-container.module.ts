import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvestorsContainerRoutingModule } from './investors-container-routing.module';
import { InvestorsContainerComponent } from './investors-container.component';

@NgModule({
  declarations: [InvestorsContainerComponent],
  imports: [CommonModule, InvestorsContainerRoutingModule],
})
export class InvestorsContainerModule {}
