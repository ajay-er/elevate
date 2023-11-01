import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, ImageCropperModule],
  exports: [ProfileComponent],
})
export class ProfileModule {}
