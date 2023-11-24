import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvestorsListComponent } from './investors-list.component';

const routes: Routes = [
  {
    path: '',
    component: InvestorsListComponent,
  },
  {
    path: 'add',
    loadChildren: () =>
      import('../fill-investor-details/fill-investor-details.module').then(
        (m) => m.FillInvestorDetailsModule
      ),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvestorsListRoutingModule {}
