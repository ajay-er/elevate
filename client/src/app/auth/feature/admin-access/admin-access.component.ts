import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/shared/data-access/auth.service';
import { SnackbarService } from 'src/app/shared/data-access/snackbar.service';
import { ILogin } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-admin-access',
  templateUrl: './admin-access.component.html',
  styleUrls: ['./admin-access.component.css'],
})
export class AdminAccessComponent {
  private authService = inject(AuthService);
  private snackBar = inject(SnackbarService);

  loginFormSubmit(data: ILogin) {
    this.authService.adminLogin(data).subscribe({
      next: (res) => {
        console.log(res);
        this.snackBar.showSuccess('Elevate Admin login successfull');
      },
    });
  }
}
