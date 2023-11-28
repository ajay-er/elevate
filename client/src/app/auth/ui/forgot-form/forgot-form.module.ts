import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgotFormComponent } from './forgot-form.component';
import { LoadingButtonModule } from 'src/app/shared/ui/loading-button/loading-button.module';

@NgModule({
  declarations: [ForgotFormComponent],
  imports: [CommonModule, ReactiveFormsModule,LoadingButtonModule],
  exports:[ForgotFormComponent]
})
export class ForgotFormModule {}
