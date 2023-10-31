import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileContainerRoutingModule } from './profile-container-routing.module';
import { ProfileContainerComponent } from './profile-container.component';
import { ProfileModule } from '../../ui/profile/profile.module';

@NgModule({
  imports: [CommonModule, ProfileContainerRoutingModule, ProfileModule],
  declarations: [ProfileContainerComponent],
})
export class ProfileContainerModule {}
