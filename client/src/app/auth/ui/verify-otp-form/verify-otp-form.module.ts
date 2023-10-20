import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyOtpFormComponent } from './verify-otp-form.component';



@NgModule({
  declarations: [
    VerifyOtpFormComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    VerifyOtpFormComponent
  ]
})
export class VerifyOtpFormModule { }
