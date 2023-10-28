import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { verifyOTPGuardGuard } from 'src/app/shared/guards/verify-otp.guard';
import { resetPasswordGuardGuard } from 'src/app/shared/guards/reset-password-guard.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../auth-access/auth-access.module').then(
        (m) => m.AuthAccessModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('../../ui/login-form/login-form.module').then(
        (m) => m.LoginFormModule
      ),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('../../ui/signup-form/signup-form.module').then(
        (m) => m.SignupFormModule
      ),
  },
  {
    path: 'verify',
    loadChildren: () =>
      import('../../ui/verify-email-form/email-verify-form.module').then(
        (m) => m.VerifyEmailFormModule
      ),
  },
  {
    path: 'verify-otp',
    loadChildren: () =>
      import('../../ui/verify-otp-form/verify-otp-form.module').then(
        (m) => m.VerifyOtpFormModule
      ),
    canActivate: [verifyOTPGuardGuard],
  },
  {
    path: 'reset-password/:token',
    loadChildren: () =>
      import('../../ui/forgot-form/forgot-form.module').then(
        (m) => m.ForgotFormModule
      ),
    canActivate: [resetPasswordGuardGuard],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthShellRoutingModule {}
