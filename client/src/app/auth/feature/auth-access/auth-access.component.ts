import { Component, inject } from '@angular/core';
import { IRole, Tab } from 'src/app/shared/types';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { State } from '../../../shared/data-access/state/auth';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../../shared/data-access/state/auth/auth.action';
import { Subscription, filter } from 'rxjs';
import {
  IConfirmPass,
  ILogin,
  ISignup,
  IVerifyOTP,
} from 'src/app/shared/interfaces';
import { AuthService } from '../../../shared/data-access/auth.service';
import { SnackbarService } from 'src/app/shared/data-access/snackbar.service';
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
  private socialAuthSubscription!: Subscription;

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private store = inject(Store<State>);
  private authService = inject(AuthService);
  private snackbar = inject(SnackbarService);
  private localstorageService = inject(LocalStorageService);

  selectedTab(tab: Tab) {
    this.currentTab = tab;
    this.router.navigate([tab], { relativeTo: this.activatedRoute });
  }

  // The function sets the current authentication tab based on the current route segment.
  constructor() {
    this.setAuthTabFromRoute();
  }

  private setAuthTabFromRoute(): void {
    //whenever user refresh the page
    const url = window.location.pathname;
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
      const secondSegment = segments[3];
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
    if (this.socialAuthSubscription) {
      this.socialAuthSubscription.unsubscribe();
    }
  }

  //form submissions
  //login
  loginFormSubmit(formData: ILogin) {
    this.authService.login(formData).subscribe({
      next: (res) => {
        console.log(res);
        if (res.user.role === IRole.FOUNDER) {
          this.snackbar.showSuccess('Login successfull');
          const currentUser: ICurrentUser = {
            name: res.user.firstName,
            email: res.user.email,
            isEmailVerified: res.user.isEmailVerified,
            role: res.user.role,
          };

          if (res.user.profileImgUrl) {
            currentUser.photo = res.user.profileImgUrl;
          }

          this.store.dispatch(
            AuthActions.SetAccessToken({
              accessToken: res.accessToken,
              tokenType: 'access_token',
            })
          );
          const isFounderLoggedIn =
            res.user.role === IRole.FOUNDER ? true : false;
          const isInvestorLoggedIn =
            res.user.role === IRole.INVESTOR ? true : false;

          this.store.dispatch(
            AuthActions.SetCurrentUser({
              currentUser,
              isFounderLoggedIn,
              isInvestorLoggedIn,
            })
          );
          this.router.navigateByUrl('/founder/ideas');
        } else {
          this.snackbar.showError('Invalid credentials');
        }
      },
    });
  }

  //signup
  signupFormSubmit(formData: ISignup) {
    this.authService.signup(formData).subscribe({
      next: (res) => {
        console.log(res);
        this.localstorageService.save('email', res.user.email);
        this.snackbar.showSuccess(res.message);
        this.router.navigateByUrl('/auth/founder/verify-otp');
      },
    });
  }

  verifyOtpSubmit(otpSubmisstion: IVerifyOTP) {
    const email = this.localstorageService.get('email');
    if (email) {
      otpSubmisstion.email = email;
    }
    this.authService.verifyOtp(otpSubmisstion).subscribe({
      next: (res) => {
        console.log(res);
        this.store.dispatch(
          AuthActions.SetAccessToken({
            accessToken: res.accessToken,
            tokenType: 'access_token',
          })
        );
        this.snackbar.showSuccess('Login successfully');
        const currentUser = {
          name: res.user.firstName,
          email: res.user.email,
          isEmailVerified: res.user.isEmailVerified,
          role: res.user.role,
        };
        const isFounderLoggedIn =
          res.user.role === IRole.FOUNDER ? true : false;
        const isInvestorLoggedIn =
          res.user.role === IRole.INVESTOR ? true : false;

        this.store.dispatch(
          AuthActions.SetCurrentUser({
            currentUser,
            isFounderLoggedIn,
            isInvestorLoggedIn,
          })
        );
        this.router.navigateByUrl('/founder/ideas');
      },
    });
  }

  resetPassFormSubmit(email: { email: string }) {
    this.authService.forgotPass(email).subscribe({
      next: (res) => {
        console.log(res);
        this.snackbar.showSuccess(res.message);
        this.router.navigateByUrl('/auth/founder/login');
      },
    });
  }

  verifyForgotFormSubmit(data: IConfirmPass) {
    this.authService.confirmPassWord(data).subscribe({
      next: (res) => {
        this.snackbar.showSuccess('Password reset succesfull,Please login');
        this.router.navigateByUrl('/auth/founder/login');
      },
    });
  }

  resendOtp() {
    const email = this.localstorageService.get('email');
    if (email) {
      this.authService.resendOtp({ email }).subscribe({
        next: (res) => {
          console.log(res);
          this.snackbar.showSuccess(res.message);
        },
      });
    } else {
      this.snackbar.showError('oops something wrong! please signup again');
    }
  }
}
