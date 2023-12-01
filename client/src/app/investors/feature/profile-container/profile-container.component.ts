import { Component, inject } from '@angular/core';
import { InvestorsService } from '../../data-access/investors.service';
import { SharedService } from '../../../shared/data-access/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-container',
  templateUrl: './profile-container.component.html',
  styleUrls: ['./profile-container.component.css'],
})
export class ProfileContainerComponent {
  private sharedService = inject(SharedService);
  private investorService = inject(InvestorsService);
  private subscription$: Subscription;

  constructor() {
    this.subscription$ = this.sharedService
      .getData()
      .subscribe((file: File) => {
        const formData = new FormData();
        formData.append('profile', file);
        this.investorService.updateProfileImage(formData);
      });
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
