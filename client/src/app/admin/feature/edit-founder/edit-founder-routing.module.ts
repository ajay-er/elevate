import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditFounderComponent } from './edit-founder.component';

const routes: Routes = [
  {
    path: '',
    component: EditFounderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditFounderRoutingModule {}
