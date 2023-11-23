import {
  ChangeDetectionStrategy,
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerifyOtpFormComponent {
  @Output() submitVerifyOtpForm: EventEmitter<{ otp: string }> =
    new EventEmitter();
  @Output() resendOtp: EventEmitter<void> = new EventEmitter();

  display: any;
  submitted: boolean = false;
  otp: string = '';

  constructor() {
    this.timer();
  }

  onSubmit() {
    this.submitted = true;
    const isOtpValid = this.otpInputs
      .toArray()
      .every((input) => /^\d$/.test(input.nativeElement.value));
    if (isOtpValid) {
      this.otp = this.otpInputs
        .map((input) => input.nativeElement.value)
        .join('');
      this.submitted = false;

      this.submitVerifyOtpForm.emit({ otp: this.otp });
    } else {
      this.submitted = true;
      console.error('Oops enter valid otp');
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

  timer(minute = 1) {
    let seconds: number = minute * 60;
    let textSec: any = '0';
    let statSec: number = 60;

    const prefix = minute < 10 ? '0' : '';

    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = `0${  statSec}`;
      } else textSec = statSec;

      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      if (seconds == 0) {
        clearInterval(timer);
        this.display = '';
      }
    }, 1000);
  }

  resend() {
    this.timer();
    this.resendOtp.emit();
  }
}
