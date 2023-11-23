import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProfileContainerRoutingModule } from "./profile-container-routing.module";
import { ProfileContainerComponent } from "./profile-container.component";
import { ProfileModule } from "../../ui/profile/profile.module";

@NgModule({
  declarations: [ProfileContainerComponent],
  imports: [CommonModule, ProfileContainerRoutingModule, ProfileModule],
})
export class ProfileContainerModule {}
