import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvestorAccessRoutingModule } from './investor-access-routing.module';
import { InvestorAccessComponent } from './investor-access.component';
import { ForgotFormModule } from '../../ui/forgot-form/forgot-form.module';
import { LoginFormModule } from '../../ui/login-form/login-form.module';
import { SignupFormModule } from '../../ui/signup-form/signup-form.module';
import { VerifyEmailFormModule } from '../../ui/verify-email-form/email-verify-form.module';
import { VerifyOtpFormModule } from '../../ui/verify-otp-form/verify-otp-form.module';
import { InvestorTabContainerModule } from '../../ui/investor-tab-container/investor-tab-container.module';

@NgModule({
  declarations: [InvestorAccessComponent],
  imports: [
    CommonModule,
    InvestorAccessRoutingModule,
    InvestorTabContainerModule,
    LoginFormModule,
    SignupFormModule,
    VerifyEmailFormModule,
    VerifyOtpFormModule,
    ForgotFormModule,
  ],
})
export class InvestorAccessModule {}
