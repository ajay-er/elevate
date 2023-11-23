import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminAccessComponent } from "./admin-access.component";
import { adminUnauthGuard } from "src/app/shared/guards/admin-unauth.guard";

const routes: Routes = [
  {
    path: "login",
    component: AdminAccessComponent,
  },
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminAccessRoutingModule {}
