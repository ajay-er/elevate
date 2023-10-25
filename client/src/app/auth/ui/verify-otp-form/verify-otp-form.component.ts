import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'app-verify-otp-form',
  templateUrl: './verify-otp-form.component.html',
  styleUrls: ['./verify-otp-form.component.css'],
})
export class VerifyOtpFormComponent {
  @Output() submitVerifyOtpForm: EventEmitter<{ otp: string }> =
    new EventEmitter();

  submitted: boolean = false;
  otp: string = '';

  onSubmit() {
    this.submitted = true;
    const isOtpValid = this.otpInputs
      .toArray()
      .every((input) => /^\d$/.test(input.nativeElement.value));
    if (isOtpValid) {
      this.otp = this.inputs.join('');
      this.submitted = false;
      this.submitVerifyOtpForm.emit({ otp: this.otp });
    } else {
      this.submitted = true;
      console.log('Invalid OTP');
    }
  }

  inputs: number[] = [0, 0, 0, 0, 0, 0];
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;
  onInput(index: number) {
    if (index < this.otpInputs.length - 1) {
      this.otpInputs.toArray()[index + 1].nativeElement.focus();
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace' && index > 0) {
      event.preventDefault();
      this.inputs[index] = 0;
      this.otpInputs.toArray()[index].nativeElement.value = '';
      this.otpInputs.toArray()[index - 1].nativeElement.focus();
    }
  }
}
