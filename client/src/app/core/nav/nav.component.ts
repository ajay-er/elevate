import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State, getCurrentUserData, isFounderLoggedIn } from 'src/app/shared/data-access/state/auth';
import { UnsetCurrentUser } from 'src/app/shared/data-access/state/auth/auth.action';
import { ICurrentUser } from 'src/app/shared/data-access/state/auth/auth.reducer';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  currentUser$!: Observable<ICurrentUser>;
  isFounderLoggedIn$!: Observable<boolean>;

  constructor(private store: Store<State>,private router:Router) {
    //*select from store
    this.currentUser$ = this.store.select(getCurrentUserData);
    this.isFounderLoggedIn$ = this.store.select(isFounderLoggedIn);
  }

  logOut(): void {
    this.store.dispatch(UnsetCurrentUser());
    this.router.navigateByUrl('/auth/founder/login');
  }

  //dump
  isNavbarOpen = false;
  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  isDropdownOpen = false;
  toggleProfileDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
