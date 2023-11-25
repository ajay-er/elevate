import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StartupDetailsRoutingModule } from './startup-details-routing.module';
import { StartupDetailsComponent } from './startup-details.component';
import { StartupDetailModule } from '../../ui/startup-detail/startup-detail.module';

@NgModule({
  declarations: [StartupDetailsComponent],
  imports: [CommonModule, StartupDetailsRoutingModule,StartupDetailModule],
})
export class StartupDetailsModule {}
