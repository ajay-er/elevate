import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  inject,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { SharedService } from '../../data-access/shared.service';

@Component({
  selector: 'app-update-image',
  templateUrl: './update-image.component.html',
  styleUrls: ['./update-image.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateImageComponent {
  private sharedService = inject(SharedService);
  private sanitizer = inject(DomSanitizer);
  imageChangedEvent: any = '';
  croppedImage: any = '';
  croppedFile!: File;

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    if (event && event.objectUrl) {
      this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(
        event.objectUrl
      );
      this.croppedFile = this.blobToFile(
        this.croppedImage,
        `${Date.now()}_profile.png`
      );
    }
  }

  blobToFile(blob: Blob, fileName: string): File {
    const file = new File([blob], fileName, { type: blob.type });
    return file;
  }

  crop() {
    if (this.croppedFile) {
      this.sharedService.sendImageFile(this.croppedFile);
    }
  }
}
