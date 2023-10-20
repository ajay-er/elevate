import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ForgotPassComponent } from './forgot-pass.component';
import { TabContainerModule } from '../../ui/tab-container/tab-container.module';
import { ForgotFormModule } from '../../ui/forgot-form/forgot-form.module';
import { OtpVerifyModule } from '../otp-verify/otp-verify.module';

@NgModule({
  declarations: [
    ForgotPassComponent
  ],
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
    TabContainerModule,
    ForgotFormModule,
    OtpVerifyModule
  ]
})
export class ForgotPasswordModule { }
