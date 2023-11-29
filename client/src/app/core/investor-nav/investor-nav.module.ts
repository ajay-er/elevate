import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvestorNavComponent } from './investor-nav.component';

@NgModule({
  declarations: [InvestorNavComponent],
  imports: [CommonModule],
  exports: [InvestorNavComponent],
})
export class InvestorNavModule {}
