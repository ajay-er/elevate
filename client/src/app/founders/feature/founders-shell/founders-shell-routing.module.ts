import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { founderAuthGuard } from 'src/app/shared/guards/founder-auth.guard';

const routes: Routes = [
  {
    path: 'profile',
    loadChildren: () =>
      import('../profile-container/profile-container.module').then(
        (m) => m.ProfileContainerModule
      ),
    canActivate: [founderAuthGuard],
  },
  {
    path: 'investors',
    loadChildren: () =>
      import('../investors-list/investors-list.module').then(
        (m) => m.InvestorsListModule
      ),
  },
  {
    path: 'investor/:id',
    loadChildren: () =>
      import('../investor-detail/investor-detail.module').then(
        (m) => m.InvestorDetailModule
      ),
  },
  {
    path: 'ideas',
    loadChildren: () =>
      import('../ideas/ideas.module').then((m) => m.IdeasModule),
  },
  {
    path: 'idea/:id',
    loadChildren: () =>
      import('../idea-with-comments/ideas-comment.module').then((m) => m.IdeasCommentsModule),
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
