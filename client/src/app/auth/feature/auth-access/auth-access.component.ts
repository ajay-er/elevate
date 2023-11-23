import { Component, inject } from "@angular/core";
import { Tab } from "src/app/shared/types";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { State } from "../../../shared/data-access/state/auth";
import { Store } from "@ngrx/store";
import * as AuthActions from "../../../shared/data-access/state/auth/auth.action";
import { Subscription, filter } from "rxjs";
import {
  IConfirmPass,
  ILogin,
  ISignup,
  IVerifyOTP,
} from "src/app/shared/interfaces";
import { AuthService } from "../../../shared/data-access/auth.service";
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { SnackbarService } from "src/app/shared/data-access/snackbar.service";
import { ICurrentUser } from "src/app/shared/data-access/state/auth/auth.reducer";
import { LocalStorageService } from "src/app/shared/data-access/local-storage.service";

@Component({
  selector: "app-auth-access",
  templateUrl: "./auth-access.component.html",
  styleUrls: ["./auth-access.component.css"],
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
  private socialAuthService = inject(SocialAuthService);
  private snackbar = inject(SnackbarService);
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
    this.socialAuthSubscription = this.socialAuthService.authState.subscribe(
      (user: SocialUser) => {
        if (user) {
          console.log(user);
          this.authService.sendGoogleToken(user.idToken).subscribe({
            next: (res: any) => {
              console.log(res);
              
              if (res?.user) {
                const currentUser: ICurrentUser = {
                  name: res.user?.firstName,
                  photo: res.user?.profileImgUrl,
                  email: res.user?.email,
                  isEmailVerified: res.user?.isEmailVerified,
                };
                //*dispatch
                this.store.dispatch(
                  AuthActions.SetCurrentUser({ currentUser })
                );
                this.store.dispatch(
                  AuthActions.SetAccessToken({
                    accessToken: res.accessToken,
                    tokenType: "access_token",
                  })
                );
                this.snackbar.showSuccess("Login successfull");
              }
            },
          });
        }
      }
    );
  }

  private setAuthTabFromRoute(): void {
    //whenever user refresh the page
    const url = window.location.pathname;
    const path = url.split("/");
    this.processUrlSegments(path);

    //listen for routes and change the tab accordingly
    this.routeSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const segments = event.url.split("/");
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
        this.snackbar.showSuccess("Login successfull");
        const currentUser: ICurrentUser = {
          name: res.user.firstName,
          email: res.user.email,
          isEmailVerified: res.user.isEmailVerified,
        };

        if (res.user.profileImgUrl) {
          currentUser.photo = res.user.profileImgUrl;
        }

        this.store.dispatch(
          AuthActions.SetAccessToken({
            accessToken:res.accessToken,
            tokenType: "access_token",
          })
        );        

        this.store.dispatch(AuthActions.SetCurrentUser({ currentUser }));
      },
    });
  }

  //signup
  signupFormSubmit(formData: ISignup) {
    this.authService.signup(formData).subscribe({
      next: (res) => {
        console.log(res);
        const currentUser = {
          name: res.user.firstName,
          email: res.user.email,
          isEmailVerified: res.user.isEmailVerified,
        };

        this.store.dispatch(AuthActions.SetCurrentUser({ currentUser }));
        this.snackbar.showSuccess(res.message);
        this.router.navigateByUrl("/auth/verify-otp");
      },
    });
  }

  verifyOtpSubmit(otpSubmisstion: IVerifyOTP) {
    const email = this.localstorageService.get("email");
    if (email) {
      otpSubmisstion.email = email;
    }
    this.authService.verifyOtp(otpSubmisstion).subscribe({
      next: (res) => {
        console.log(res);
        this.store.dispatch(
          AuthActions.SetAccessToken({
            accessToken: res.accessToken,
            tokenType: "access_token",
          })
        );
        this.snackbar.showSuccess("Login successfully");
        const currentUser = {
          name: res.user.firstName,
          email: res.user.email,
          isEmailVerified: res.user.isEmailVerified,
        };
        this.store.dispatch(AuthActions.SetCurrentUser({ currentUser }));
        this.router.navigateByUrl("/ideas");
      },
    });
  }

  resetPassFormSubmit(email: { email: string }) {
    this.authService.forgotPass(email).subscribe({
      next: (res) => {
        console.log(res);
        this.snackbar.showSuccess(res.message);
        this.router.navigateByUrl("/auth/login");
      },
    });
  }

  verifyForgotFormSubmit(data: IConfirmPass) {
    this.authService.confirmPassWord(data).subscribe({
      next: (res) => {
        this.snackbar.showSuccess("Password reset succesfull,Please login");
        this.router.navigateByUrl("/auth/login");
      },
    });
  }

  resendOtp() {
    const email = this.localstorageService.get("email");
    if (email) {
      this.authService.resendOtp({ email }).subscribe({
        next: (res) => {
          console.log(res);
          this.snackbar.showSuccess(res.message);
        },
      });
    } else {
      this.snackbar.showError("oops something wrong! please signup again");
    }
  }
}
