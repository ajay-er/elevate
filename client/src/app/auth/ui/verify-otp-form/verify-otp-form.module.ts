import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyOtpFormComponent } from './verify-otp-form.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [VerifyOtpFormComponent],
  imports: [CommonModule,FormsModule],
  exports: [VerifyOtpFormComponent],
})
export class VerifyOtpFormModule {
  
}
