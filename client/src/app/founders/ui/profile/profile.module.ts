import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { LoadingButtonModule } from 'src/app/shared/ui/loading-button/loading-button.module';

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule,LoadingButtonModule, ImageCropperModule],
  exports: [ProfileComponent],
})
export class ProfileModule {}
