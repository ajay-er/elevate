import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../investors-list/investors-list.module').then(
        (m) => m.InvestorsListModule
      ),
  },
  {
    path: 'profile/:id',
    loadChildren: () =>
      import('../profile-container/profile-container.module').then(
        (m) => m.ProfileContainerModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvestorsShellRoutingModule {}
