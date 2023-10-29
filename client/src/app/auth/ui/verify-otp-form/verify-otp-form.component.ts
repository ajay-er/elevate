import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { LocalStorageService } from 'src/app/shared/data-access/local-storage.service';
import { IVerifyOTP } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-verify-otp-form',
  templateUrl: './verify-otp-form.component.html',
  styleUrls: ['./verify-otp-form.component.css'],
})
export class VerifyOtpFormComponent {
  @Output() submitVerifyOtpForm: EventEmitter<{ otp: string }> =
    new EventEmitter();

  display: any;
  submitted: boolean = false;
  otp: string = '';

  constructor(private localstorageService: LocalStorageService) {
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
      console.log(this.otp, 'otp here');
      const email = this.localstorageService.get('email');
      const otpData: IVerifyOTP = { otp: this.otp };
      if (email) {
        otpData.email = email;
      }
      this.submitVerifyOtpForm.emit(otpData);
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
        textSec = '0' + statSec;
      } else textSec = statSec;

      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      if (seconds == 0) {
        console.log('finished timer');
        clearInterval(timer);
        this.display = '';
      }
    }, 1000);
  }

  resend() {
    this.timer();
  }
}
