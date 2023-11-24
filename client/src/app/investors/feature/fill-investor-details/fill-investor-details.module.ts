import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FillInvestorDetailsRoutingModule } from './fill-investor-details-routing.module';
import { FillInvestorDetailsComponent } from './fill-investor-details.component';
import { InvestorDetailsModule } from '../../ui/investor-details/investor-details.module';


@NgModule({
  declarations: [
    FillInvestorDetailsComponent
  ],
  imports: [
    CommonModule,
    FillInvestorDetailsRoutingModule,
    InvestorDetailsModule
  ]
})
export class FillInvestorDetailsModule { }
