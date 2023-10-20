import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  QueryList,
} from '@angular/core';
import { AuthTabComponent } from '../auth-tab/auth-tab.component';

@Component({
  selector: 'app-tab-container',
  templateUrl: './tab-container.component.html',
  styleUrls: ['./tab-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabContainerComponent {
  @ContentChildren(AuthTabComponent) tabs: QueryList<AuthTabComponent> =
    new QueryList();

  ngAfterContentInit(): void {
    const activeTabs = this.tabs?.filter((tab) => tab.active);
    if (!activeTabs || activeTabs.length === 0) {
      this.selectTab(this.tabs!.first);
    }
  }
  
  selectTab(tab: AuthTabComponent) {
    this.tabs?.forEach((tab) => {
      tab.active = false;
    });

    tab.active = true;
    return false;
  }



}
