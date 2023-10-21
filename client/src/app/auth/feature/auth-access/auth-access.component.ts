import { Component, inject } from '@angular/core';
import { Tab } from 'src/app/shared/types';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { State } from '../../data-access/state';
import { Store } from '@ngrx/store';
import { toogleAuthTab } from '../../data-access/state/auth.action';
import { filter } from 'rxjs';

@Component({
  selector: 'app-auth-access',
  templateUrl: './auth-access.component.html',
  styleUrls: ['./auth-access.component.css'],
})
export class AuthAccessComponent {
  protected TabType: typeof Tab = Tab;
  currentTab: Tab = Tab.Login;
  private routeSubscription: any;

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private store = inject(Store<State>);

  selectedTab(tab: Tab) {
    this.currentTab = tab;
    this.router.navigate([tab], { relativeTo: this.activatedRoute });
    this.dispatchAuthTabChange();
  }

  // The function sets the current authentication tab based on the current route segment.
  ngOnInit(): void {
    this.setAuthTabFromRoute();
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  private setAuthTabFromRoute(): void {
    this.routeSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const segments = event.url.split('/');
        if (segments.length >= 2) {
          const secondSegment = segments[2];
          switch (secondSegment) {
            case this.TabType.Login:
              this.currentTab = this.TabType.Login;
              break;
            case this.TabType.Forgot:
              this.currentTab = this.TabType.Forgot;
              break;
            case this.TabType.Signup:
              this.currentTab = this.TabType.Signup;
              break;
            case this.TabType.Verify:
              this.currentTab = this.TabType.Verify;
              break;
          }
          this.dispatchAuthTabChange();
        }
      });
  }

  private dispatchAuthTabChange(): void {
    this.store.dispatch(toogleAuthTab({ currentAuthTab: this.currentTab }));
  }
}
