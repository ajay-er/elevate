import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvestorDetailRoutingModule } from './investor-detail-routing.module';
import { InvestorDetailComponent } from './investor-detail.component';
import { LoadingButtonModule } from 'src/app/shared/ui/loading-button/loading-button.module';
import { FormatInvestmentAmountPipe } from 'src/app/shared/resolvers/FormatInvestmentAmount.pipe';

@NgModule({
  declarations: [InvestorDetailComponent],
  imports: [CommonModule, InvestorDetailRoutingModule,LoadingButtonModule,FormatInvestmentAmountPipe],
})
export class InvestorDetailModule {}
