import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TabContainerComponent } from "./tab-container.component";
import { RouterModule } from "@angular/router";
import { GoogleSigninButtonDirective, GoogleSigninButtonModule } from "@abacritt/angularx-social-login";

@NgModule({
  declarations: [TabContainerComponent],
  imports: [CommonModule, RouterModule,GoogleSigninButtonModule],
  exports: [TabContainerComponent],
  providers:[
    GoogleSigninButtonDirective
  ]
})
export class TabContainerModule {}
