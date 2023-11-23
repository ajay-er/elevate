import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { adminUnauthGuard } from "src/app/shared/guards/admin-unauth.guard";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("../auth-access/auth-access.module").then(
        (m) => m.AuthAccessModule
      ),
  },
  {
    path: "admin",
    loadChildren: () =>
      import("../admin-access/admin-access.module").then(
        (m) => m.AdminAccessModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthShellRoutingModule {}
