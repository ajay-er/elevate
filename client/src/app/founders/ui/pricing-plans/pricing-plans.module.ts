import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricingPlansComponent } from './pricing-plans.component';
import { PricingPlanLiModule } from '../pricing-plan-li/pricing-plan-li.module';

@NgModule({
  declarations: [PricingPlansComponent],
  imports: [CommonModule, PricingPlanLiModule],
  exports: [PricingPlansComponent],
})
export class PricingPlansModule {}
