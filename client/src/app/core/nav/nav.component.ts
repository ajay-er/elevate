import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State, getCurrentUserData, isUserLoggedIn } from 'src/app/shared/data-access/state/auth';
import { UnsetCurrentUser } from 'src/app/shared/data-access/state/auth/auth.action';
import { ICurrentUser } from 'src/app/shared/data-access/state/auth/auth.reducer';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  currentUser$!: Observable<ICurrentUser>;
  isUserLoggedIn$!: Observable<boolean>;

  constructor(private store: Store<State>) {
    //*select from store
    this.currentUser$ = this.store.select(getCurrentUserData);
    this.isUserLoggedIn$ = this.store.select(isUserLoggedIn);
  }

  logOut(): void {
    this.store.dispatch(UnsetCurrentUser());
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
