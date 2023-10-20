import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css'],
})
export class SignupFormComponent {
  private router = inject(Router);

  signup() {
    this.router.navigate(['/auth/forgot/verify-otp']);
    return;
  }
}
