import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvestorsListRoutingModule } from './investors-list-routing.module';
import { InvestorsListComponent } from './investors-list.component';

@NgModule({
  declarations: [InvestorsListComponent],
  imports: [CommonModule, InvestorsListRoutingModule],
})
export class InvestorsListModule {}
