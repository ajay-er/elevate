import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProfileContainerRoutingModule } from "./profile-container-routing.module";
import { ProfileContainerComponent } from "./profile-container.component";
import { ProfileModule } from "../../ui/profile/profile.module";
import { EditNameInputModule } from "../../ui/edit-name-input/edit-name-input.module";
import { EditEmailModule } from "../../ui/edit-email/edit-email.module";
import { EditPhoneModule } from "../../ui/edit-phone/edit-phone.module";
import { AddAddressModule } from "../../ui/add-address/add-address.module";

@NgModule({
  imports: [
    CommonModule,
    ProfileContainerRoutingModule,
    ProfileModule,
    EditNameInputModule,
    EditEmailModule,
    EditPhoneModule,
    AddAddressModule,
  ],
  declarations: [ProfileContainerComponent],
})
export class ProfileContainerModule {}
