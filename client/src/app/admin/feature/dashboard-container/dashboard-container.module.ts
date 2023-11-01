import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardContainerRoutingModule } from './dashboard-container-routing.module';
import { DashboardContainerComponent } from './dashboard-container.component';

@NgModule({
  declarations: [DashboardContainerComponent],
  imports: [CommonModule, DashboardContainerRoutingModule],
})
export class DashboardContainerModule {}
