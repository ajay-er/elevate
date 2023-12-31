import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileContainerRoutingModule } from './profile-container-routing.module';
import { ProfileContainerComponent } from './profile-container.component';
import { UpdateProfileModule } from '../../../shared/ui/update-profile/update-profile.module';
import { UpdateImageModule } from 'src/app/shared/ui/update-image/update-image.module';

@NgModule({
  declarations: [ProfileContainerComponent],
  imports: [
    CommonModule,
    ProfileContainerRoutingModule,
    UpdateProfileModule,
    UpdateImageModule,
  ],
})
export class ProfileContainerModule {}
