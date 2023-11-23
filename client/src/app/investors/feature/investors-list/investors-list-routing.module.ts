import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InvestorsListComponent } from "./investors-list.component";

const routes: Routes = [
  {
    path: "",
    component: InvestorsListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvestorsListRoutingModule {}
