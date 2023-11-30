import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardCardsComponent } from './dashboard-cards.component';

@NgModule({
  declarations: [DashboardCardsComponent],
  imports: [CommonModule],
  exports:[DashboardCardsComponent]
})
export class DashboardCardsModule {}
