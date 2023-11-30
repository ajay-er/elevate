import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardContainerRoutingModule } from './dashboard-container-routing.module';
import { DashboardContainerComponent } from './dashboard-container.component';
import { DashboardCardsModule } from '../../ui/dashboard-cards/dashboard-cards.module';
import { Chart1Module } from '../../ui/chart-1/chart-1.module';
import { ListUsersModule } from '../../ui/list-users/list-users.module';
import { Chart2Module } from '../../ui/chart-2/chart-2.module';

@NgModule({
  declarations: [DashboardContainerComponent],
  imports: [
    CommonModule,
    DashboardContainerRoutingModule,
    Chart1Module,
    Chart2Module,
    DashboardCardsModule,
    ListUsersModule
  ],
})
export class DashboardContainerModule {}
