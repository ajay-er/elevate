import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdeasComponent } from './ideas.component';

const routes: Routes = [{
  path:'',
  component:IdeasComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IdeasRoutingModule { }
