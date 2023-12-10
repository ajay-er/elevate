import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { IUserProfile } from 'src/app/shared/interfaces';
import { ProfileTab } from 'src/app/shared/types';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  protected SelectTab: typeof ProfileTab = ProfileTab;
  @Output() toggleEditBtn = new EventEmitter<ProfileTab>();
  @Output() updateImage = new EventEmitter<FormData>();
  @Input() userData!: IUserProfile;

  private sanitizer = inject(DomSanitizer);
  imageChangedEvent: any = '';
  croppedImage: any = '';
  croppedFile!: Blob;
  modalOpen: boolean = false;

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    if (event && event.objectUrl) {
      this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(
        event.objectUrl
      );
      if (event.blob) {
        this.croppedFile = event.blob;
      }
    }

  }

  imageLoaded() {
    this.modalOpen = true;
  }

  cancelModal() {
    this.modalOpen = false;
  }

  toogleEditButton(tab: ProfileTab) {
    this.toggleEditBtn.emit(tab);
  }

  sendTobackend() {
    if (this.croppedFile) {
      const formData = new FormData();
      formData.append('profile', this.croppedFile);
      this.updateImage.emit(formData);
    }
  }
}
