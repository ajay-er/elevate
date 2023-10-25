import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthAccessRoutingModule } from './auth-access-routing.module';
import { AuthAccessComponent } from './auth-access.component';
import { TabContainerModule } from '../../ui/tab-container/tab-container.module';
import { VerifyEmailFormModule } from '../../ui/verify-email-form/email-verify-form.module';
import { LoginFormModule } from '../../ui/login-form/login-form.module';
import { SignupFormModule } from '../../ui/signup-form/signup-form.module';
import { VerifyOtpFormModule } from '../../ui/verify-otp-form/verify-otp-form.module';

@NgModule({
  declarations: [AuthAccessComponent],
  imports: [
    CommonModule,
    AuthAccessRoutingModule,
    TabContainerModule,
    LoginFormModule,
    SignupFormModule,
    VerifyEmailFormModule,
    VerifyOtpFormModule,
  ],
})
export class AuthAccessModule {}
