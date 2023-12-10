import { Component, inject } from '@angular/core';
import { ProfileTab } from 'src/app/shared/types';
import { ProfileService } from '../../data-access/profile.service';
import {
  IUpdateName,
  IUpdatePhone,
  IUserProfile,
} from 'src/app/shared/interfaces';
import { SnackbarService } from 'src/app/shared/data-access/snackbar.service';
import { SharedService } from 'src/app/shared/data-access/shared.service';
import { Subscription } from 'rxjs';

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

  private sharedService = inject(SharedService);
  private subscription$: Subscription;


  ngOnInit() {
    this.getUserProfile();
  }

  constructor() {
    this.subscription$ = this.sharedService
      .getData()
      .subscribe((blob: Blob) => {
        const formData = new FormData();
        formData.append('profile',blob);
        this.profileService.updateProfileImage(formData).subscribe((res:any) => {
          console.log(res);
          this.snackbar.showSuccess(res.message);
        });
      });
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
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

}
