import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtpVerifyRoutingModule } from './otp-verify-routing.module';
import { OtpVerifyComponent } from './otp-verify.component';
import { TabContainerModule } from '../../ui/tab-container/tab-container.module';
import { VerifyOtpFormModule } from '../../ui/verify-otp-form/verify-otp-form.module';


@NgModule({
  declarations: [
    OtpVerifyComponent
  ],
  imports: [
    CommonModule,
    OtpVerifyRoutingModule,
    TabContainerModule,
    VerifyOtpFormModule
  ]
})
export class OtpVerifyModule { }
