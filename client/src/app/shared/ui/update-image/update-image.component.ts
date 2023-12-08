import {
  ChangeDetectionStrategy,
  Component,
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
  croppedFile!: Blob;

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl || event.base64 || ''); 
    this.croppedFile = event.blob!;       
  }

  crop() {
    if (this.croppedFile) {
      this.sharedService.sendImageFile(this.croppedFile);
    }
  }
}
