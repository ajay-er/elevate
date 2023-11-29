import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateImageComponent } from './update-image.component';
import { LoadingButtonModule } from 'src/app/shared/ui/loading-button/loading-button.module';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [UpdateImageComponent],
  imports: [CommonModule, LoadingButtonModule,ImageCropperModule],
  exports: [UpdateImageComponent],
})
export class UpdateImageModule {}
