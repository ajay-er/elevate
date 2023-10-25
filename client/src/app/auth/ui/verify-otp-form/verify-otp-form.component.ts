import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-verify-otp-form',
  templateUrl: './verify-otp-form.component.html',
  styleUrls: ['./verify-otp-form.component.css'],
})
export class VerifyOtpFormComponent {
  inputs: number[] = [0, 0, 0, 0, 0, 0];
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;
  onInput(index: number) {
    if (index < this.otpInputs.length - 1) {
      this.otpInputs.toArray()[index + 1].nativeElement.focus();
    }
  }
}
