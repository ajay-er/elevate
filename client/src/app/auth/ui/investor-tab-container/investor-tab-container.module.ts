import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvestorTabContainerComponent } from './investor-tab-container.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [InvestorTabContainerComponent],
  imports: [CommonModule, RouterModule],
  exports: [InvestorTabContainerComponent],
})
export class InvestorTabContainerModule {}
