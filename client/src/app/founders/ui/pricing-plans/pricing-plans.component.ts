import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { PlanType } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-pricing-plans',
  templateUrl: './pricing-plans.component.html',
  styleUrls: ['./pricing-plans.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PricingPlansComponent {
  @Output() sub = new EventEmitter<PlanType>;
  Plan = PlanType;
  subscribe(plan:PlanType) {
    this.sub.emit(plan);
  }
}
