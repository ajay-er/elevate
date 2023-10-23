import { Component } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  socialUser!: SocialUser;
  isLoggedin: boolean = false;

  constructor(private socialAuthService: SocialAuthService) {}

  ngOnInit(): void {
    initFlowbite();
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      console.log(user);
    });
  }

  logOut(): void {
    this.socialAuthService.signOut();
  }
}
