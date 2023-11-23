import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFoundersComponent } from './add-founders.component';

const routes: Routes = [{
  path:'',
  component:AddFoundersComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddFoundersRoutingModule { }
