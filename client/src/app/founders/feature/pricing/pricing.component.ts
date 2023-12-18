import { Component, inject } from '@angular/core';
import { FoundersService } from '../../data-access/founders.service';
import { Store } from '@ngrx/store';
import {
  State,
  isFounderLoggedIn,
} from 'src/app/shared/data-access/state/auth';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/shared/data-access/snackbar.service';

declare const Razorpay: any;

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css'],
})
export class PricingComponent {
  private founderService = inject(FoundersService);
  private store = inject(Store<State>);
  private snackbar = inject(SnackbarService);
  private router = inject(Router);
  private isFLoggedIn: boolean = false;
  ngOnInit() {
    this.store.select(isFounderLoggedIn).subscribe((loggedIn) => {
      this.isFLoggedIn = loggedIn;
    });
  }
  payNow(plan: string) {
    if (!this.isFLoggedIn) {
      this.router.navigateByUrl('/auth/founder/login');
      this.snackbar.showError('Please login');
      return;
    }

    this.founderService.createSubscription(plan).subscribe((res: any) => {
      const subscription = res.subscription;      
      const RazarpayOptions = {
        subscription_id: subscription.id,
        description: 'Monthly plan test',
        currency: 'INR',
        name: 'Elevate',
        key: 'rzp_test_mfG6Xukc148Lkm',
        image: '../../../../assets/images/logo.jpg',
        handler: (res: any) => {
          this.founderService.updateSubscription(res).subscribe((r:any) => {
            console.log('payment succesfully completed');
            this.snackbar.showSuccess('Subscription successfully completed');
          });
        },
        prefill: {
          name: subscription.name,
          email: subscription.email,
        },
        theme: {
          color: '#6466e3',
        },
      };
      const rzpy = new Razorpay(RazarpayOptions);
      rzpy.open();
    });
  }
}
