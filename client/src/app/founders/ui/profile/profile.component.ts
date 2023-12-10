import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { SharedService } from 'src/app/shared/data-access/shared.service';
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
  @Input() userData!: IUserProfile;
  
  private sharedService = inject(SharedService);
  private sanitizer = inject(DomSanitizer);
  imageChangedEvent: any = '';
  croppedImage: any = '';
  croppedFile!: Blob;
  modalOpen: boolean = false;

  imageLoaded() {
    this.modalOpen = true;
  }

  cancelModal() {
    this.modalOpen = false;
  }

  toogleEditButton(tab: ProfileTab) {
    this.toggleEditBtn.emit(tab);
  }


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
      this.modalOpen = false;
    }
  }
}
