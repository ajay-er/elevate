import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoundersListComponent } from './founders-list.component';

const routes: Routes = [
  {
    path: '',
    component: FoundersListComponent,
  },
  {
    path: 'add',
    loadChildren: () =>
      import('../add-founders/add-founders.module').then(
        (m) => m.AddFoundersModule
      ),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoundersListRoutingModule {}
