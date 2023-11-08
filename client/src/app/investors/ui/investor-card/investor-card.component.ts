import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-investor-card',
  templateUrl: './investor-card.component.html',
  styleUrls: ['./investor-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvestorCardComponent {
  @Input() imgsrc!:string;
  @Input() name!:string;
  @Input() description!:string;
}
