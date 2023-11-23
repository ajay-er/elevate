import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [SpinnerComponent],
  imports: [CommonModule, NgxSpinnerModule],
  exports: [SpinnerComponent],
})
export class SpinnerModule {}
