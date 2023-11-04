import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { initFlowbite } from 'flowbite';
import { State } from './shared/data-access/state/auth';
import { CheckLocalStorageAction } from './shared/data-access/state/auth/auth.action';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private store = inject(Store<State>);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  currentLayout:string = 'user';
  ngOnInit() {
    initFlowbite();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let route = this.activatedRoute;
        while (route.firstChild) {
          route.firstChild.data.subscribe((data) => {
            console.log(data['layout']);
            if (data['layout']) {
              this.currentLayout = data['layout'];
            }
          });
          route = route.firstChild;
        }
      }
    });


    //checking user logged in or not
    this.store.dispatch(CheckLocalStorageAction());
  }
}
