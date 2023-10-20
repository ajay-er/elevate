import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthAccessRoutingModule } from './auth-access-routing.module';
import { AuthAccessComponent } from './auth-access.component';
import { TabContainerModule } from '../../ui/tab-container/tab-container.module';
import { AuthTabModule } from '../../ui/auth-tab/auth-tab.module';
import { ForgotFormModule } from '../../ui/forgot-form/forgot-form.module';
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
    AuthTabModule,
    SignupFormModule,
    ForgotFormModule,
    VerifyOtpFormModule,
  ],
})
export class AuthAccessModule {}
