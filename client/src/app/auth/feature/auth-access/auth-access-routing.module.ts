import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthAccessComponent } from './auth-access.component';
import { VerifyOtpFormComponent } from '../../ui/verify-otp-form/verify-otp-form.component';
import { VerifyEmailFormComponent } from '../../ui/verify-email-form/email-verify-form.component';
import { SignupFormComponent } from '../../ui/signup-form/signup-form.component';
import { LoginFormComponent } from '../../ui/login-form/login-form.component';
import { verifyOTPGuardGuard } from 'src/app/shared/guards/verify-otpguard.guard';
import { ForgotFormComponent } from '../../ui/forgot-form/forgot-form.component';
import { resetPasswordGuardGuard } from 'src/app/shared/guards/reset-password-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthAccessComponent,
    children: [
      { path: 'login', component: LoginFormComponent },
      { path: 'signup', component: SignupFormComponent },
      { path: 'verify', component: VerifyEmailFormComponent },
      {
        path: 'verify-otp',
        component: VerifyOtpFormComponent,
        canActivate: [verifyOTPGuardGuard],
      },
      {
        path: 'reset-password/:token',
        component: ForgotFormComponent,
        canActivate: [resetPasswordGuardGuard],
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthAccessRoutingModule {}
