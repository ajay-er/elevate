import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvestorTabComponent } from './investor-tab.component';
import { LoadingButtonModule } from 'src/app/shared/ui/loading-button/loading-button.module';
import { RouterModule } from '@angular/router';
import { FormatInvestmentAmountPipe } from 'src/app/shared/resolvers/FormatInvestmentAmount.pipe';

@NgModule({
  declarations: [InvestorTabComponent],
  imports: [CommonModule,RouterModule,FormatInvestmentAmountPipe,LoadingButtonModule],
  exports: [InvestorTabComponent],
})
export class InvestorTabModule {}
