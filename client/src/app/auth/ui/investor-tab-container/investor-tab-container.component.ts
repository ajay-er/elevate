import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Tab } from 'src/app/shared/types';

@Component({
  selector: 'app-investor-tab-container',
  templateUrl: './investor-tab-container.component.html',
  styleUrls: ['./investor-tab-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvestorTabContainerComponent {
  protected TabType: typeof Tab = Tab;
  @Input() currentTab!: Tab;
  @Output() tabSelected = new EventEmitter<Tab>();

  selectTab(page: Tab) {
    this.tabSelected.emit(page);
  }
}
