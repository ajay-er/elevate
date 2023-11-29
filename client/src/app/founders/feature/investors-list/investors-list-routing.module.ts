import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvestorsListComponent } from './investors-list.component';

const routes: Routes = [
  {
    path: 'all',
    component: InvestorsListComponent,
  },
  {
    path: '',
    redirectTo: 'all',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvestorsListRoutingModule {}
