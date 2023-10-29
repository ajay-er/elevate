import { Component, EventEmitter, Output, inject } from '@angular/core';
import {
  Validators,
  FormBuilder,
  AbstractControlOptions,
} from '@angular/forms';
import { CustomValidationService } from '../../data-access/custom-validation.service';
import { ISignup } from 'src/app/shared/interfaces';
import { LocalStorageService } from 'src/app/shared/data-access/local-storage.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css'],
})
export class SignupFormComponent {
  @Output() submitSignupForm: EventEmitter<ISignup> = new EventEmitter();
  private fb = inject(FormBuilder);
  private customValidator = inject(CustomValidationService);
  private localStorageService = inject(LocalStorageService);

  registerForm = this.fb.group(
    {
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        Validators.compose([
          Validators.required,
          this.customValidator.patternValidator(),
        ]),
      ],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validator: this.customValidator.MatchPassword(
        'password',
        'confirmPassword'
      ),
    } as AbstractControlOptions
  );

  get registerFormControl() {
    return this.registerForm.controls;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.localStorageService.setOtpVerifyTimeLimitToken();
      this.submitSignupForm.emit(this.registerForm.value as ISignup);
    }
  }
}
