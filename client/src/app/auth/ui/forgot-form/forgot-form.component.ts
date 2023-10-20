import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-form',
  templateUrl: './forgot-form.component.html',
  styleUrls: ['./forgot-form.component.css'],
})
export class ForgotFormComponent {
  private router = inject(Router);

  forgot() {
    this.router.navigate(['/auth/forgot/verify-otp']);
    return;
  }
}
