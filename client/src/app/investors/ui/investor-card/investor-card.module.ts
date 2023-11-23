import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvestorCardComponent } from './investor-card.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [InvestorCardComponent],
  imports: [CommonModule,RouterModule],
  exports: [InvestorCardComponent],
})
export class InvestorCardModule {}
