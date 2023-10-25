import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ILogin } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  @Output() submitForm: EventEmitter<ILogin> = new EventEmitter();

  private fb = inject(FormBuilder);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  onSubmit() {    if (this.loginForm.valid) {
      // this.submitForm.emit(this.loginForm.value);
    }
  }
}
