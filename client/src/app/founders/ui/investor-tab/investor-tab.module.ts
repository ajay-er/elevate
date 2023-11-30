import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvestorTabComponent } from './investor-tab.component';
import { LoadingButtonModule } from 'src/app/shared/ui/loading-button/loading-button.module';

@NgModule({
  declarations: [InvestorTabComponent],
  imports: [CommonModule, LoadingButtonModule],
  exports: [InvestorTabComponent],
})
export class InvestorTabModule {}
