import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddFounderFormComponent } from './add-founder-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [AddFounderFormComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports: [AddFounderFormComponent],
})
export class AddFounderFormModule {}
