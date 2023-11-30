import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvestorsListRoutingModule } from './investors-list-routing.module';
import { InvestorsListComponent } from './investors-list.component';
import { AsideInvestorsModule } from '../../ui/aside-investors/aside-investors.module';
import { InvestorTabModule } from '../../ui/investor-tab/investor-tab.module';
import { PaginationModule } from 'src/app/shared/ui/pagination/pagination.module';

@NgModule({
  declarations: [InvestorsListComponent],
  imports: [
    CommonModule,
    InvestorsListRoutingModule,
    AsideInvestorsModule,
    InvestorTabModule,
    PaginationModule
  ],
})
export class InvestorsListModule {}
