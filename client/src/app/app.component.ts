import { Component } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { AuthService } from './auth/data-access/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  socialUser!: SocialUser;
  isLoggedin: boolean = false;

  constructor(
    private socialAuthService: SocialAuthService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    initFlowbite();

    this.socialAuthService.authState.subscribe((user) => {
      this.authService.sendGoogleToken(user.idToken).subscribe({
        next: (res) => {
          this.isLoggedin = user != null;
          this.socialUser = user;
        },
        error: (err) => {
          console.error('Oops something wrong', err);
        },
      });
    });
  }

  logOut(): void {
    this.socialAuthService.signOut();
  }
}
