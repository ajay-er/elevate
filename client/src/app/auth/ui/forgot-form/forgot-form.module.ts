import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgotFormComponent } from './forgot-form.component';

@NgModule({
  declarations: [ForgotFormComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports:[ForgotFormComponent]
})
export class ForgotFormModule {}
