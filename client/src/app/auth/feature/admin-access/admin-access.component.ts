import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/shared/data-access/auth.service";
import { LocalStorageService } from "src/app/shared/data-access/local-storage.service";
import { SnackbarService } from "src/app/shared/data-access/snackbar.service";
import { ILogin } from "src/app/shared/interfaces";

@Component({
  selector: "app-admin-access",
  templateUrl: "./admin-access.component.html",
  styleUrls: ["./admin-access.component.css"],
})
export class AdminAccessComponent {
  private authService = inject(AuthService);
  private snackBar = inject(SnackbarService);
  private localStorage = inject(LocalStorageService);
  private router = inject(Router);

  loginFormSubmit(data: ILogin) {
    this.authService.adminLogin(data).subscribe({
      next: (res) => {
        this.localStorage.save("access_token", res.accessToken);
        this.snackBar.showSuccess("Elevate Admin login successfull");
        this.router.navigateByUrl("/admin/dashboard");
      },
    });
  }

  
}
