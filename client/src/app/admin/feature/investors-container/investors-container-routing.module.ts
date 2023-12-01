import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvestorsContainerComponent } from './investors-container.component';

const routes: Routes = [
  {
    path: '',
    component: InvestorsContainerComponent,
  },
  {
    path: ':id',
    loadChildren: () =>
      import('../edit-investor/edit-investor.module').then(
        (m) => m.EditInvestorModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvestorsContainerRoutingModule {}
