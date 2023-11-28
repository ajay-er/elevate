import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LoadingButtonService } from '../../data-access/loading-button.service';

@Component({
  selector: 'app-loading-button',
  templateUrl: './loading-button.component.html',
  styleUrls: ['./loading-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingButtonComponent {
  constructor(public loadingService: LoadingButtonService) {}
  @Input() label: string = 'UPDATE';
  @Input() disabled: boolean = false;
  @Input() type: string = 'button';
  @Input() buttonClass: string = `text-white bg-blue-700 hover:bg-blue-800 
  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600
   dark:hover:bg-blue-700 inline-flex items-center`;
}
