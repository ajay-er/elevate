import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/data-access/auth.service';
import {
  State,
  getCurrentUserData,
  isUserLoggedIn,
} from 'src/app/auth/data-access/state';
import {
  SetCurrentUser,
  UnsetCurrentUser,
} from 'src/app/auth/data-access/state/auth.action';
import { ICurrentUser } from 'src/app/auth/data-access/state/auth.reducer';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  socialUser!: SocialUser;
  currentUser$!: Observable<ICurrentUser>;
  isUserLoggedIn$!: Observable<boolean>;

  constructor(
    private socialAuthService: SocialAuthService,
    private authService: AuthService,
    private store: Store<State>
  ) {
    //*select from store
    this.currentUser$ = this.store.select(getCurrentUserData);
    this.isUserLoggedIn$ = this.store.select(isUserLoggedIn);
  }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user: any) => {
      this.authService.sendGoogleToken(user.idToken).subscribe({
        next: (res: any) => {
          this.socialUser = user;
          const currentUser = {
            name: user.name,
            photo: user?.photoUrl,
            email: user.email,
          };
          //*dispatch
          this.store.dispatch(SetCurrentUser({ currentUser }));
        },
        error: (err: any) => {
          console.error('Oops something wrong', err);
        },
      });
    });
  }

  logOut(): void {
    this.socialAuthService.signOut();

    //*dispatch
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
