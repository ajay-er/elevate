import { Component, inject } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { CheckLocalStorageAction } from './shared/data-access/state/auth/auth.action';
import { Subscription } from 'rxjs';
import { PagelayoutService } from './shared/data-access/pagelayout.service';
import { IRole } from './shared/types';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { JwtService } from './shared/data-access/jwt.service';
import { State } from './shared/data-access/state/auth';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private store = inject(Store<State>);
  private routerSubscription!: Subscription;
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  readonly jwtService = inject(JwtService);
  readonly pageLayoutService = inject(PagelayoutService);
  readonly IRole = IRole;
  
  
  ngOnInit() {
    initFlowbite();

    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let route = this.activatedRoute;
        while (route.firstChild) {
          route.firstChild.data.subscribe((data) => {
            if (data['layout']) {
              this.pageLayoutService.setLayout(data['layout']);
            } else {
              this.pageLayoutService.setLayout(IRole.FOUNDER);
            }
          });
          route = route.firstChild;
        }
      }
    });

    //checking user logged in or not
    this.store.dispatch(CheckLocalStorageAction());
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
