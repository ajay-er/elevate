import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingButtonModule } from 'src/app/shared/ui/loading-button/loading-button.module';

@NgModule({
  declarations: [LoginFormComponent],
  imports: [CommonModule,ReactiveFormsModule,LoadingButtonModule],
  exports: [LoginFormComponent],
})
export class LoginFormModule {}
