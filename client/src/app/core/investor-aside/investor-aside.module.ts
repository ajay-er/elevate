import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvestorAsideComponent } from './investor-aside.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [InvestorAsideComponent],
  imports: [CommonModule,RouterModule],
  exports: [InvestorAsideComponent],
})
export class InvestorAsideModule {}
