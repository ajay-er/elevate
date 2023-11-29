import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileContainerRoutingModule } from './profile-container-routing.module';
import { ProfileContainerComponent } from './profile-container.component';

@NgModule({
  declarations: [ProfileContainerComponent],
  imports: [CommonModule, ProfileContainerRoutingModule],
})
export class ProfileContainerModule {}
