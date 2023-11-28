import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyOtpFormComponent } from './verify-otp-form.component';
import { FormsModule } from '@angular/forms';
import { LoadingButtonModule } from 'src/app/shared/ui/loading-button/loading-button.module';

@NgModule({
  declarations: [VerifyOtpFormComponent],
  imports: [CommonModule,FormsModule,LoadingButtonModule],
  exports: [VerifyOtpFormComponent],
})
export class VerifyOtpFormModule {}
