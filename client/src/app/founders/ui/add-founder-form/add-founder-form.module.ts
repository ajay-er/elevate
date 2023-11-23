import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddFounderFormComponent } from './add-founder-form.component';

@NgModule({
  declarations: [
    AddFounderFormComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[AddFounderFormComponent]
})
export class AddFounderFormModule { }
