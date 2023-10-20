import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-tab-container',
  templateUrl: './tab-container.component.html',
  styleUrls: ['./tab-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabContainerComponent {

}
