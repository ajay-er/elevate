import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvestorTabComponent } from './investor-tab.component';
import { LoadingButtonModule } from 'src/app/shared/ui/loading-button/loading-button.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [InvestorTabComponent],
  imports: [CommonModule, LoadingButtonModule,RouterModule],
  exports: [InvestorTabComponent],
})
export class InvestorTabModule {}
