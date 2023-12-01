import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditInvestorRoutingModule } from './edit-investor-routing.module';
import { EditInvestorComponent } from './edit-investor.component';
import { LoadingButtonModule } from 'src/app/shared/ui/loading-button/loading-button.module';

@NgModule({
  declarations: [EditInvestorComponent],
  imports: [CommonModule, EditInvestorRoutingModule, LoadingButtonModule],
})
export class EditInvestorModule {}
