import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { InvestorsListRoutingModule } from "./investors-list-routing.module";
import { InvestorsListComponent } from "./investors-list.component";
import { InvestorCardModule } from "../../ui/investor-card/investor-card.module";

@NgModule({
  declarations: [InvestorsListComponent],
  imports: [CommonModule, InvestorsListRoutingModule, InvestorCardModule],
})
export class InvestorsListModule {}
