import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartupDetailsComponent } from './startup-details.component';

const routes: Routes = [{
  path:'',
  component:StartupDetailsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StartupDetailsRoutingModule { }
