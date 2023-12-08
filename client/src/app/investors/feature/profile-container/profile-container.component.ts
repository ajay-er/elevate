import { Component, inject } from '@angular/core';
import { InvestorsService } from '../../data-access/investors.service';
import { SharedService } from '../../../shared/data-access/shared.service';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/data-access/snackbar.service';

@Component({
  selector: 'app-profile-container',
  templateUrl: './profile-container.component.html',
  styleUrls: ['./profile-container.component.css'],
})
export class ProfileContainerComponent {
  private sharedService = inject(SharedService);
  private investorService = inject(InvestorsService);
  private snackBar = inject(SnackbarService);
  private subscription$: Subscription;

  constructor() {
    this.subscription$ = this.sharedService
      .getData()
      .subscribe((blob: Blob) => {
        const formData = new FormData();
        formData.append('profile',blob);
        this.investorService.updateProfileImage(formData).subscribe((res:any) => {
          console.log(res);
          this.snackBar.showSuccess(res.message);
        });
      });
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
