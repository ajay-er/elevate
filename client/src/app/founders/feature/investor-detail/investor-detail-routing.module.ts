import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvestorDetailComponent } from './investor-detail.component';

const routes: Routes = [
  {
    path: '',
    component: InvestorDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvestorDetailRoutingModule {}
