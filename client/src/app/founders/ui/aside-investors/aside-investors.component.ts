import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-aside-investors',
  templateUrl: './aside-investors.component.html',
  styleUrls: ['./aside-investors.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsideInvestorsComponent {
  @Input() values!: any;
}
