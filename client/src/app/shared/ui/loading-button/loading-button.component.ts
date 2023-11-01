import { ChangeDetectionStrategy, Component, Input, } from '@angular/core';
import { LoadingButtonService } from '../../data-access/loading-button.service';

@Component({
  selector: 'app-loading-button',
  templateUrl: './loading-button.component.html',
  styleUrls: ['./loading-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingButtonComponent {
  constructor(public loadingService: LoadingButtonService) {}
  @Input() label: string = 'UPDATE';
  @Input() disabled: boolean = false;
}
