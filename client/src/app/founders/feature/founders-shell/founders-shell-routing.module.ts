import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'profile',
    loadChildren: () =>
      import('../profile-container/profile-container.module').then(
        (m) => m.ProfileContainerModule
      ),
  },
  {
    path: 'investors',
    loadChildren: () =>
      import('../investors-list/investors-list.module').then(
        (m) => m.InvestorsListModule
      ),
  },
  {
    path: 'ideas',
    loadChildren: () =>
      import('../ideas/ideas.module').then((m) => m.IdeasModule),
  },
  {
    path: 'pricing',
    loadChildren: () =>
      import('../pricing/pricing.module').then((m) => m.PricingModule),
  },
  {
    path: '',
    redirectTo: 'ideas',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoundersShellRoutingModule {}
