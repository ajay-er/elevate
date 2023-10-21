import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupFormComponent } from './signup-form.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SignupFormComponent],
  imports: [CommonModule, FormsModule],
  exports: [SignupFormComponent],
})
export class SignupFormModule {}
