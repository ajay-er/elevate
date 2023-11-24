import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FillInvestorDetailsComponent } from './fill-investor-details.component';

const routes: Routes = [{
  path:'',
  component:FillInvestorDetailsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FillInvestorDetailsRoutingModule { }
