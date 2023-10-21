import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotFormComponent } from './forgot-form.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ForgotFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[ForgotFormComponent]
})
export class ForgotFormModule { }
