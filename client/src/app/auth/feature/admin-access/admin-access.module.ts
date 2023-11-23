import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminAccessRoutingModule } from "./admin-access-routing.module";
import { AdminAccessComponent } from "./admin-access.component";
import { LoginFormModule } from "../../ui/login-form/login-form.module";

@NgModule({
  declarations: [AdminAccessComponent],
  imports: [CommonModule, AdminAccessRoutingModule, LoginFormModule],
})
export class AdminAccessModule {}
