import { Component, inject } from '@angular/core';
import { Tab } from 'src/app/shared/types';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { State } from '../../data-access/state';
import { Store } from '@ngrx/store';
import {
  CheckLocalStorageAction,
  SetCurrentUser,
  SetUserLoggedInFalse,
  ToogleAuthTab,
} from '../../data-access/state/auth.action';
import { Subscription, filter } from 'rxjs';
import { ILogin, ISignup } from 'src/app/shared/interfaces';
import { AuthService } from '../../data-access/auth.service';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { SnackbarService } from 'src/app/shared/data-access/snackbar.service';

@Component({
  selector: 'app-auth-access',
  templateUrl: './auth-access.component.html',
  styleUrls: ['./auth-access.component.css'],
})
export class AuthAccessComponent {
  protected TabType: typeof Tab = Tab;
  currentTab: Tab = Tab.Login;
  private routeSubscription!: Subscription;

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private store = inject(Store<State>);
  private authService = inject(AuthService);
  private socialAuthService = inject(SocialAuthService);
  private snackbar = inject(SnackbarService)

  selectedTab(tab: Tab) {
    this.currentTab = tab;
    this.router.navigate([tab], { relativeTo: this.activatedRoute });
  }

  // The function sets the current authentication tab based on the current route segment.
  ngOnInit(): void {
    this.store.dispatch(CheckLocalStorageAction());
    this.setAuthTabFromRoute();
    this.subscribeSocialAuth();
  }

  private subscribeSocialAuth() {
    this.socialAuthService.authState.subscribe((user: SocialUser) => {
      this.authService.sendGoogleToken(user.idToken).subscribe({
        next: (res: any) => {
          this.store.dispatch(SetUserLoggedInFalse());
          if (user) {
            const currentUser = {
              name: user.name,
              photo: user?.photoUrl,
              email: user.email,
            };
            //*dispatch
            this.store.dispatch(SetCurrentUser({ currentUser }));
          }
        },
        error: (err: any) => {
          console.error('Oops something wrong', err);
        },
      });
    });
  }

  private setAuthTabFromRoute(): void {
    //whenever user refresh the page
    let url = window.location.pathname;
    const path = url.split('/');
    this.processUrlSegments(path);

    //listen for routes and change the tab accordingly
    this.routeSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const segments = event.url.split('/');
        this.processUrlSegments(segments);
      });
  }

  private processUrlSegments(segments: string[]) {
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
        case this.TabType.VerifyOtp:
          this.currentTab = this.TabType.VerifyOtp;
          break;
      }
    }

    //dispatch action
    this.dispatchAuthTabChange();
  }

  private dispatchAuthTabChange(): void {
    this.store.dispatch(ToogleAuthTab({ currentAuthTab: this.currentTab }));
  }

  //The ngOnDestroy function checks if there is a routeSubscription and unsubscribes from it if it exists.
  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  //form submissions
  //login
  loginFormSubmit(formData: ILogin) {
    this.authService.login(formData).subscribe({
      next: (res) => {
        console.log(res);
        const currentUser = {
          name: res.firstName,
          photo: res?.profileImgUrl,
          email: res.email,
        };
        this.store.dispatch(SetCurrentUser({ currentUser }));
      },
      error: (e) => {
        console.error(e);
      },
    });
  }

  //signup
  signupFormSubmit(formData: ISignup) {
    this.authService.signup(formData).subscribe({
      next: (res) => {
        console.log(res);
        const currentUser = {
          name: res.firstName,
          email: res.email,
        };
        this.store.dispatch(SetCurrentUser({ currentUser }));
      },
      error: (e) => {
        console.error(e);
      },
    });
  }

  //email verify
  verifyEmailFormSubmit(email: { email: string }) {
    this.authService.verifyEmail(email).subscribe({
      next: (res) => {
        console.log(res);
        // this.router.navigateByUrl('/auth/verify-otp');
      },
      error: (e) => {
        console.error(e);
      },
    });
  }

  verifyOtpSubmit(otp: { otp: string }) {
    this.authService.verifyOtp(otp).subscribe({
      next: (res) => {
        console.log(res);
        const currentUser = {
          name: res.firstName,
          photo: res?.profileImgUrl,
          email: res.email,
        };
        this.store.dispatch(SetCurrentUser({ currentUser }));
      },
      error: (e) => {
        console.error(e);
      },
    });
  }

  verifyForgotFormSubmit(data:any){}


}
