import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PricingRoutingModule } from './pricing-routing.module';
import { PricingComponent } from './pricing.component';
import { PricingPlansModule } from '../../ui/pricing-plans/pricing-plans.module';

@NgModule({
  declarations: [PricingComponent],
  imports: [
    CommonModule,
    PricingRoutingModule,
    PricingPlansModule
  ],
})
export class PricingModule {}
