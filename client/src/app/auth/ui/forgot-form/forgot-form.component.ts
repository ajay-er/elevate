import { Component, EventEmitter, Output, inject } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { IForgot } from 'src/app/shared/interfaces';
import { CustomValidationService } from '../../data-access/custom-validation.service';

@Component({
  selector: 'app-forgot-form',
  templateUrl:'./forgot-form.component.html',
  styleUrls: ['./forgot-form.component.css'],
})
export class ForgotFormComponent {
  @Output() submitForgotForm: EventEmitter<IForgot> = new EventEmitter();
  private fb = inject(FormBuilder);
  private customValidator = inject(CustomValidationService);

  forgotForm = this.fb.group(
    {
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
    return this.forgotForm.controls;
  }

  onSubmit() {
    if (this.forgotForm.valid) {
      this.submitForgotForm.emit(this.forgotForm.value as IForgot);
    }
  }
}
