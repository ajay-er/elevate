import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-investor-aside',
  templateUrl: './investor-aside.component.html',
  styleUrls: ['./investor-aside.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvestorAsideComponent {
  isHovered = false;
}
