import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FoundersContainerComponent } from "./founders-container.component";

const routes: Routes = [
  {
    path: "",
    component: FoundersContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoundersContainerRoutingModule {}
