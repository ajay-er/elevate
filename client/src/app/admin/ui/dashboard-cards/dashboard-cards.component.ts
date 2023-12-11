import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-cards',
  templateUrl: './dashboard-cards.component.html',
  styleUrls: ['./dashboard-cards.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardCardsComponent {
  @Input() count: number = 0;
  @Input() label: string = '';
  @Input() bgColor: string = 'text-purple-600 bg-purple-100';
}
