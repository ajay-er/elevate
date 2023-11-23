import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
  {
    path: "dashboard",
    loadChildren: () =>
      import("../dashboard-container/dashboard-container.module").then(
        (m) => m.DashboardContainerModule
      ),
  },
  {
    path: "investors",
    loadChildren: () =>
      import("../investors-container/investors-container.module").then(
        (m) => m.InvestorsContainerModule
      ),
  },
  {
    path: "founders",
    loadChildren: () =>
      import("../founders-container/founders-container.module").then(
        (m) => m.FoundersContainerModule
      ),
  },
  {
    path: "transactions",
    loadChildren: () =>
      import("../transactions-container/transactions-container.module").then(
        (m) => m.TransactionsContainerModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminShellRoutingModule {}
