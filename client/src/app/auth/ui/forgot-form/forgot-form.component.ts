import { Component, EventEmitter, Output, inject } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { CustomValidationService } from '../../data-access/custom-validation.service';
import { ActivatedRoute } from '@angular/router';
import { IConfirmPass } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-forgot-form',
  templateUrl: './forgot-form.component.html',
  styleUrls: ['./forgot-form.component.css'],
})
export class ForgotFormComponent {
  @Output() submitForgotForm: EventEmitter<IConfirmPass> = new EventEmitter();
  private fb = inject(FormBuilder);
  private customValidator = inject(CustomValidationService);
  private activatedRoute = inject(ActivatedRoute);

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
    let token;
    this.activatedRoute.paramMap.subscribe((params) => {
      token = params.get('token');
    });

    if (this.forgotForm.valid && token) {
      const newPasswordControl = this.forgotForm.get('newPassword');

      if (newPasswordControl) {
        const data: IConfirmPass = {
          newPassword: newPasswordControl.value,
          token: token,
        };

        this.submitForgotForm.emit(data);
      }
    }
  }
}
