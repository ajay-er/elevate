import { HttpClient } from "@angular/common/http";
import { Component, inject } from "@angular/core";

declare const Razorpay: any;
@Component({
  selector: "app-idea",
  templateUrl: "./idea.component.html",
  styleUrls: ["./idea.component.css"],
})
export class IdeaComponent {
  http = inject(HttpClient);

  payNow() {
    const amount = 103929;
    this.http
      .post("/wow/payment/razorpay-order", { amount })
      .subscribe((res) => {
        const RazorpayOptions = {
          description: "Elevate",
          currency: "INR",
          amount: amount,
          name: "Ajay",
          key: "rzp_test_mfG6Xukc148Lkm",
          image: "../../../../assets/images/logo.jpg",
          prefill: {
            name: "sai kumar",
            email: "sai@gmail.com",
            phone: "9898989898",
          },
          theme: {
            color: "#3399cc",
          },
          modal: {
            ondismiss: () => {
              console.log("dismissed");
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
