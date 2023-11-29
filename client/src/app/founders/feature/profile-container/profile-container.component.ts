import { Component, inject } from '@angular/core';
import { ProfileTab } from 'src/app/shared/types';
import { ProfileService } from '../../data-access/profile.service';
import {
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

  selectTab(tab: ProfileTab) {
    if (this.currentTab === tab) {
      this.currentTab = this.SelectTab.NothingSelected;
      return;
    }
    this.currentTab = tab;
  }

  getUserProfile() {
    this.profileService.getProfile().subscribe({
      next: (res: any) => {
        console.log(res);
        this.currentUserProfile = {
          email: res.user.email,
          name: res.user.firstName,
          lastName: res.user?.lastName,
          phone: res.user?.phone,
          photo: res.user?.profileImgUrl,
        };
      },
    });
  }

  updateName(data: IUpdateName) {
    this.profileService.updateName(data).subscribe({
      next: (res) => {
        this.snackbar.showSuccess('Name changed successfully');
      },
    });
  }

  updatePhone(data: IUpdatePhone) {
    this.profileService.updatePhone(data).subscribe({
      next: (res) => {
        this.snackbar.showSuccess('Phone number changed successfully');
      },
    });
  }

  updateProfileImage(data: FormData) {
    this.profileService.updateProfileImage(data).subscribe({
      next: (res: any) => {
        this.snackbar.showSuccess('Profile image updated succeccfully');
        this.currentUserProfile.photo = res.user.profileImgUrl;
      },
    });
  }
}
