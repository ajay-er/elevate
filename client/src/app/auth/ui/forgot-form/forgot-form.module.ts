import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotFormComponent } from './forgot-form.component';

@NgModule({
  declarations: [
    ForgotFormComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[ForgotFormComponent]
})
export class ForgotFormModule { }
