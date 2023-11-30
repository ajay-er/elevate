import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-pricing-li',
  templateUrl: './pricing-plan-li.component.html',
  styleUrls: ['./pricing-plan-li.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PricingPlanLiComponent {
  @Input() label:string = 'Sample';
  @Input() right:boolean = true;
}
