import { Component, inject } from '@angular/core';
import { ProfileTab } from 'src/app/shared/types';
import { ProfileService } from '../../data-access/profile.service';
import {
  IAddress,
  IUpdateImage,
  IUpdateName,
  IUpdatePhone,
  IUserProfile,
} from 'src/app/shared/interfaces';
import { SnackbarService } from 'src/app/shared/data-access/snackbar.service';

@Component({
  selector: 'app-profile-container',
  templateUrl: './profile-container.component.html',
  styleUrls: ['./profile-container.component.css'],
})
export class ProfileContainerComponent {
  protected SelectTab: typeof ProfileTab = ProfileTab;
  currentTab!: ProfileTab;
  currentUserProfile!: IUserProfile;

  private profileService = inject(ProfileService);
  private snackbar = inject(SnackbarService);

  ngOnInit() {
    this.getUserProfile();
  }

  getUserProfile() {
    this.currentUserProfile = {
      email: 'Ajaya@gmail.com',
      name: 'viajy',
      phone: '92929922',
      photo: undefined,
      address: null,
    };
    this.profileService.getProfile().subscribe({
      next: (res: any) => {
        console.log(res);
        this.currentUserProfile = {
          email: res.user.email,
          name: res.user.name,
          phone: res.user.phone,
          photo: res.user.profileImgUrl,
          address: res.user.address ? res.user.address : null,
        };
      },
    });
  }

  selectTab(tab: ProfileTab) {
    if (this.currentTab === tab) {
      this.currentTab = this.SelectTab.NothingSelected;
      return;
    }
    this.currentTab = tab;
  }

  updateName(data: IUpdateName) {
    console.log(data);
    this.profileService.updateName(data).subscribe({
      next: (res) => {
        this.snackbar.showSuccess('Name changed successfully');
      },
    });
  }

  updatePhone(data: IUpdatePhone) {
    console.log(data);
    this.profileService.updatePhone(data).subscribe({
      next: (res) => {
        this.snackbar.showSuccess('Phone number changed successfully');
      },
    });
  }

  upsertAddress(data: IAddress) {
    console.log(data);
    this.profileService.upsertAddress(data).subscribe({
      next: (res) => {
        this.snackbar.showSuccess('address succesfully added!');
      },
    });
  }

  updateProfileImage(data: IUpdateImage) {
    console.log(data);
    this.profileService.updateProfileImage(data).subscribe({
      next: (res) => {
        this.snackbar.showSuccess('Profile image updated succeccfully');
      },
    });
  }
}
