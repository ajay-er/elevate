import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-verify-form',
  templateUrl: './email-verify-form.component.html',
})
export class VerifyEmailFormComponent {
  @Output() submitVerifyEmailForm: EventEmitter<{ email: string }> =
    new EventEmitter();

  private fb = inject(FormBuilder);

  verifyForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  onSubmit() {
    if (this.verifyForm.valid) {
      window.localStorage.setItem('verify_otp_timestamp', new Date().getTime().toString());
      this.submitVerifyEmailForm.emit(
        this.verifyForm.value as { email: string }
      );
    }
  }
}
