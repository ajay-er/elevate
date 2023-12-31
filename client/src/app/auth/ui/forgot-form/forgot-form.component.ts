import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  inject,
} from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { CustomValidationService } from '../../data-access/custom-validation.service';
import { IConfirmPass } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-forgot-form',
  templateUrl: './forgot-form.component.html',
  styleUrls: ['./forgot-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotFormComponent {
  @Output() submitForgotForm: EventEmitter<IConfirmPass> = new EventEmitter();
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
    const url = window.location.pathname;
    const path = url.split('/');
    const token = path[3];

    if (this.forgotForm.valid && token) {
      const newPasswordControl = this.forgotForm.get('password');
      if (newPasswordControl && newPasswordControl.value) {
        const data: IConfirmPass = {
          newPassword: newPasswordControl.value,
          token: token,
        };
        this.submitForgotForm.emit(data);
      }
    } else {
      console.log('Oops something wrong!Please try again later');
    }
  }
}
