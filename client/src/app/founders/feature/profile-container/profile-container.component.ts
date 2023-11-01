import { Component, inject } from '@angular/core';
import { ProfileTab } from 'src/app/shared/types';
import { ProfileService } from '../../data-access/profile.service';
import { IUserProfile } from 'src/app/shared/interfaces';

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

  ngOnInit() {
    this.getUserProfile();
  }

  getUserProfile() {
    this.currentUserProfile = {
      email: 'Ajaya',
      name: 'viajy',
      phone: '92929922',
      photo: 'url',
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

  updateName(data: any) {
    this.profileService.updateName(data).subscribe({
      next: (res) => {},
    });
  }
}
