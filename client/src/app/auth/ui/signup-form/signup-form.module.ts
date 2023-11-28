import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupFormComponent } from './signup-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingButtonModule } from 'src/app/shared/ui/loading-button/loading-button.module';

@NgModule({
  declarations: [SignupFormComponent],
  imports: [CommonModule, ReactiveFormsModule,LoadingButtonModule],
  exports: [SignupFormComponent],
})
export class SignupFormModule {}
