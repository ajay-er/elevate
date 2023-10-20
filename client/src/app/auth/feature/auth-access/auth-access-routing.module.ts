import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthAccessComponent } from './auth-access.component';

const routes: Routes = [
  {
    path:'',
    component:AuthAccessComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthAccessRoutingModule { }
