import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthAccessComponent } from './auth-access.component';
import { VerifyOtpFormComponent } from '../../ui/verify-otp-form/verify-otp-form.component';
import { ForgotFormComponent } from '../../ui/forgot-form/forgot-form.component';
import { SignupFormComponent } from '../../ui/signup-form/signup-form.component';
import { LoginFormComponent } from '../../ui/login-form/login-form.component';

const routes: Routes = [
  {
    path: '',
    component: AuthAccessComponent,
    children: [
      { path: 'login', component: LoginFormComponent },
      { path: 'signup', component: SignupFormComponent },
      { path: 'forgot', component: ForgotFormComponent },
      { path: 'verify', component: VerifyOtpFormComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthAccessRoutingModule {}
