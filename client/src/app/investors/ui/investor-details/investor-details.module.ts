import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvestorDetailsComponent } from './investor-details.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [InvestorDetailsComponent],
  imports: [CommonModule,ReactiveFormsModule],
  exports:[InvestorDetailsComponent]
})
export class InvestorDetailsModule {}
