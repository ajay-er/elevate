import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvestorDetailRoutingModule } from './investor-detail-routing.module';
import { InvestorDetailComponent } from './investor-detail.component';
import { LoadingButtonModule } from 'src/app/shared/ui/loading-button/loading-button.module';

@NgModule({
  declarations: [InvestorDetailComponent],
  imports: [CommonModule, InvestorDetailRoutingModule,LoadingButtonModule],
})
export class InvestorDetailModule {}
