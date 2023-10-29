import { Component, inject } from '@angular/core';
import { Tab } from 'src/app/shared/types';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { State, getUserEmail } from '../../../shared/data-access/state/auth';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../../shared/data-access/state/auth/auth.action';
import { Subscription, filter, take } from 'rxjs';
import {
  IConfirmPass,
  ILogin,
  ISignup,
  IVerifyOTP,
} from 'src/app/shared/interfaces';
import { AuthService } from '../../../shared/data-access/auth.service';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { SnackbarService } from 'src/app/shared/data-access/snackbar.service';
import { SpinnerService } from 'src/app/shared/data-access/spinner.service';
import { ICurrentUser } from 'src/app/shared/data-access/state/auth/auth.reducer';
import { LocalStorageService } from 'src/app/shared/data-access/local-storage.service';

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
  private snackbar = inject(SnackbarService);
  private spinner = inject(SpinnerService);
  private localstorageService = inject(LocalStorageService);

  selectedTab(tab: Tab) {
    this.currentTab = tab;
    this.router.navigate([tab], { relativeTo: this.activatedRoute });
  }

  // The function sets the current authentication tab based on the current route segment.
  constructor() {
    this.setAuthTabFromRoute();
    this.subscribeSocialAuth();
  }

  private subscribeSocialAuth() {
    this.socialAuthService.authState.subscribe((user: SocialUser) => {
      this.authService.sendGoogleToken(user.idToken).subscribe({
        next: (res: any) => {
          this.store.dispatch(AuthActions.SetUserLoggedInFalse());
          console.log(res);
          if (res?.user) {
            const currentUser = {
              name: res.user?.firstName,
              photo: res.user?.profileImgUrl,
              email: res.user?.email,
              isEmailVerified: res.user?.isEmailVerified,
            } as ICurrentUser;
            //*dispatch
            this.store.dispatch(AuthActions.SetCurrentUser({ currentUser }));
            this.snackbar.showSuccess('Login successfull');
          }
        },
        error: (e: any) => {
          console.error('Oops something wrong', e);
          this.snackbar.showError(
            'Oops something wrong! Please try again later'
          );
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
    if (segments.length > 2) {
      const secondSegment = segments[2];
      switch (secondSegment) {
        case this.TabType.Login:
          this.currentTab = this.TabType.Login;
          break;
        case this.TabType.Reset:
          this.currentTab = this.TabType.Reset;
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
    } else {
      this.selectedTab(this.TabType.Login);
    }

    //dispatch action
    this.dispatchAuthTabChange();
  }

  private dispatchAuthTabChange(): void {
    this.store.dispatch(
      AuthActions.ToogleAuthTab({ currentAuthTab: this.currentTab })
    );
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
    this.spinner.startSpin();
    this.authService.login(formData).subscribe({
      next: (res) => {
        this.spinner.endSpin();
        console.log(res);
        this.snackbar.showSuccess('Login successfull');
        let currentUser: ICurrentUser = {
          name: res.user.firstName,
          email: res.user.email,
          isEmailVerified: res.user.isEmailVerified,
        };

        if (res.profileImgUrl) {
          currentUser.photo = res.profileImgUrl;
        }

        this.store.dispatch(AuthActions.SetCurrentUser({ currentUser }));
      },
      error: (e) => {
        console.error(e.error?.errors[0]?.message);
        this.spinner.endSpin();
        if (e.error?.errors[0]?.message) {
          this.snackbar.showError(e.error?.errors[0]?.message);
        } else {
          this.snackbar.showError(e.message);
        }
      },
    });
  }

  //signup
  signupFormSubmit(formData: ISignup) {
    this.spinner.startSpin();
    this.authService.signup(formData).subscribe({
      next: (res) => {
        console.log(res);
        this.spinner.endSpin();
        const currentUser = {
          name: res.user.firstName,
          email: res.user.email,
          isEmailVerified: res.user.isEmailVerified,
        };
        this.store.dispatch(AuthActions.SetCurrentUser({ currentUser }));
        this.snackbar.showSuccess(res.message);
        this.router.navigateByUrl('/auth/verify-otp');
      },
      error: (e) => {
        console.error(e);
        this.spinner.endSpin();
        if (e.error?.errors) {
          this.snackbar.showError(e.error?.errors[0]?.message);
        } else {
          this.snackbar.showError(e.message);
        }
      },
    });
  }

  verifyOtpSubmit(otpSubmisstion: IVerifyOTP) {
    this.spinner.startSpin();
    console.log(otpSubmisstion, 'ok aahno?');

    this.authService.verifyOtp(otpSubmisstion).subscribe({
      next: (res) => {
        console.log(res);
        this.spinner.endSpin();
        this.snackbar.showSuccess('Login successfully');
        const currentUser = {
          name: res.user.firstName,
          email: res.user.email,
          isEmailVerified: res.user.isEmailVerified,
        };
        this.store.dispatch(AuthActions.SetCurrentUser({ currentUser }));
        this.router.navigateByUrl('/ideas');
      },
      error: (e) => {
        console.error(e);
        this.spinner.endSpin();
        if (e.error?.errors[0]?.message) {
          this.snackbar.showError(e.error?.errors[0]?.message);
        } else {
          this.snackbar.showError(e.message);
        }
      },
    });
  }

  resetPassFormSubmit(email: { email: string }) {
    this.spinner.startSpin();
    this.authService.forgotPass(email).subscribe({
      next: (res) => {
        console.log(res);
        this.snackbar.showSuccess(res.message);
        this.spinner.endSpin();
        this.router.navigateByUrl('/auth/login');
      },
      error: (e) => {
        console.error(e);
        this.spinner.endSpin();
        if (e.error?.errors[0]?.message) {
          this.snackbar.showError(e.error?.errors[0]?.message);
        } else {
          this.snackbar.showError(e.message);
        }
      },
    });
  }

  verifyForgotFormSubmit(data: IConfirmPass) {
    this.spinner.startSpin();
    this.authService.confirmPassWord(data).subscribe({
      next: (res) => {
        console.log(res);
        this.spinner.endSpin();
        this.snackbar.showSuccess('Password reset succesfull,Please login');
        this.router.navigateByUrl('/auth/login');
      },
      error: (e) => {
        console.error(e);
        this.spinner.endSpin();
        if (e.error?.errors[0]?.message) {
          this.snackbar.showError(e.error?.errors[0]?.message);
        } else {
          this.snackbar.showError(e.message);
        }
      },
    });
  }
}
