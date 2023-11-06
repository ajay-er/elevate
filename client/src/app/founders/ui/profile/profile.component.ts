import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { IUserProfile } from 'src/app/shared/interfaces';
import { ProfileTab } from 'src/app/shared/types';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  protected SelectTab: typeof ProfileTab = ProfileTab;
  @Output() toggleEditBtn = new EventEmitter<ProfileTab>();
  @Output() updateImage = new EventEmitter<any>();
  @Input() userData!: IUserProfile;
  @ViewChild('toogleButton') toggleButton!: any;

  //TODO: complete croping
  private sanitizer = inject(DomSanitizer);
  imageChangedEvent: any = '';
  croppedImage: any = '';

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.toggleButton.nativeElement.click();
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(
      event?.objectUrl!
    );
  }

  imageLoaded(image: LoadedImage) {
    console.log('image loaded', image);
  }
  cropperReady() {
    console.log('croper is ready');
  }
  loadImageFailed() {
    console.log('image loading is failed');
  }

  toogleEditButton(tab: ProfileTab) {
    this.toggleEditBtn.emit(tab);
  }

  addCloudData(data: File) {
    const formData = new FormData();
    formData.append('file', data);
    formData.append('upload_preset', 'elevate');
    formData.append('cloud_name', 'elevate-connect');
    return formData;
  }

  sendTobackend(event?: any) {
    const file = event.target.files[0];
    const data = this.addCloudData(file);
    this.updateImage.emit(data);

    // if (this.croppedImage) {
    //   this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(
    //     event?.objectUrl!
    //   );
    //   formData.append('image', this.croppedImage);
    //   this.updateImage.emit(formData);
    // } else {
    // }
  }
}
