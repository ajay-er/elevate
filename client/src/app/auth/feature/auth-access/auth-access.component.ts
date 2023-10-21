import { Component, inject } from '@angular/core';
import { Tab } from 'src/app/shared/types/tab-enum';
import { ActivatedRoute, Router } from '@angular/router';
import { State, toggleAuthPage } from '../../data-access/state';
import { Store } from '@ngrx/store';
import { toogleAuthTab } from '../../data-access/state/auth.action';
@Component({
  selector: 'app-auth-access',
  templateUrl: './auth-access.component.html',
  styleUrls: ['./auth-access.component.css'],
})
export class AuthAccessComponent {
  protected TabType: typeof Tab = Tab;
  currentTab: Tab = Tab.Login;

  private route = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private store = inject(Store<State>);

  selectedTab(tab: Tab) {
    this.currentTab = tab;
    this.store.dispatch(toogleAuthTab({ currentAuthTab: this.currentTab }));
    this.route.navigate([tab], { relativeTo: this.activatedRoute });
  }

  ngOnInit() {
    console.log(this.store.select(toggleAuthPage));
  }
}
