import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { InvestorsContainerRoutingModule } from "./investors-container-routing.module";
import { InvestorsContainerComponent } from "./investors-container.component";
import { TableModule } from "src/app/shared/ui/table/table.module";

@NgModule({
  declarations: [InvestorsContainerComponent],
  imports: [CommonModule, InvestorsContainerRoutingModule, TableModule],
})
export class InvestorsContainerModule {}
