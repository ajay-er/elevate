import { Component, inject } from '@angular/core';
import { InvestorsService } from '../../data-access/investors.service';
import { SharedService } from '../../../shared/data-access/shared.service';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/data-access/snackbar.service';
import { JwtService } from 'src/app/shared/data-access/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-container',
  templateUrl: './profile-container.component.html',
  styleUrls: ['./profile-container.component.css'],
})
export class ProfileContainerComponent {
  private sharedService = inject(SharedService);
  private investorService = inject(InvestorsService);
  private snackBar = inject(SnackbarService);
  private jwtService = inject(JwtService);
  private router = inject(Router);
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
          const token = window.localStorage.getItem('access_token');
          if (this.jwtService.isInvestor(token!)) {
            this.router.navigateByUrl('/investor/ideas');
          }
        });
      });
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
