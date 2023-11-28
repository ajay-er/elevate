import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { VerifyEmailFormComponent } from './email-verify-form.component';
import { LoadingButtonModule } from 'src/app/shared/ui/loading-button/loading-button.module';

@NgModule({
  declarations: [VerifyEmailFormComponent],
  imports: [CommonModule, ReactiveFormsModule,LoadingButtonModule],
  exports: [VerifyEmailFormComponent],
})
export class VerifyEmailFormModule {}
