import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvestorAccessComponent } from './investor-access.component';
import { resetPasswordGuard } from 'src/app/shared/guards/reset-password.guard';
import { verifyOTPGuard } from 'src/app/shared/guards/verify-otp.guard';
import { ForgotFormComponent } from '../../ui/forgot-form/forgot-form.component';
import { LoginFormComponent } from '../../ui/login-form/login-form.component';
import { SignupFormComponent } from '../../ui/signup-form/signup-form.component';
import { VerifyEmailFormComponent } from '../../ui/verify-email-form/email-verify-form.component';
import { VerifyOtpFormComponent } from '../../ui/verify-otp-form/verify-otp-form.component';

const routes: Routes = [
  {
    path: '',
    component: InvestorAccessComponent,
    children: [
      { path: 'login', component: LoginFormComponent },
      { path: 'signup', component: SignupFormComponent },
      { path: 'verify', component: VerifyEmailFormComponent },
      {
        path: 'verify-otp',
        component: VerifyOtpFormComponent,
        canActivate: [verifyOTPGuard],
      },
      {
        path: 'reset-password/:token',
        component: ForgotFormComponent,
        canActivate: [resetPasswordGuard],
      },
      { path: '', redirectTo: '', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvestorAccessRoutingModule {}
