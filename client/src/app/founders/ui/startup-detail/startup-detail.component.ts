import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
declare const Razorpay: any;

@Component({
  selector: 'app-startup-detail',
  templateUrl: './startup-detail.component.html',
  styleUrls: ['./startup-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StartupDetailComponent {
  @Input() startup!: any;
  protected amount:number = 0;
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  payNow() {
    this.http
      .post(`${this.apiUrl}/payment/razorpay-order`, { amount:this.amount })
      .subscribe((res) => {
        const RazorpayOptions = {
          description: 'Elevate',
          currency: 'INR',
          amount: this.amount,
          name: 'Ajay',
          key: 'rzp_test_mfG6Xukc148Lkm',
          image: '../../../../assets/images/logo.jpg',
          prefill: {
            name: 'sai kumar',
            email: 'sai@gmail.com',
            phone: '9898989898',
          },
          theme: {
            color: '#3399cc',
          },
          modal: {
            ondismiss: () => {
              console.log('dismissed');
            },
          },
        };

        const successCallback = (paymentid: any) => {
          console.log(paymentid);
        };

        const failureCallback = (e: any) => {
          console.log(e);
        };

        Razorpay.open(RazorpayOptions, successCallback, failureCallback);
      });
  }

}
