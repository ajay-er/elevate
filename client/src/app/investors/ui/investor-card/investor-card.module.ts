import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvestorCardComponent } from './investor-card.component';

@NgModule({
  declarations: [InvestorCardComponent],
  exports: [InvestorCardComponent],
  imports: [CommonModule],
})
export class InvestorCardModule {}
