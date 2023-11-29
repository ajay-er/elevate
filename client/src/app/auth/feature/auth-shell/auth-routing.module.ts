import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminUnauthGuard } from 'src/app/shared/guards/admin-unauth.guard';
import { founderUnauthGuard } from 'src/app/shared/guards/founder-unauth.guard';
import { investorUnauthGuard } from 'src/app/shared/guards/investor-unauth.guard';

const routes: Routes = [
  {
    path: 'investor',
    loadChildren: () =>
      import('../investor-access/investor-access.module').then(
        (m) => m.InvestorAccessModule
      ),
    canActivate: [investorUnauthGuard],
  },
  {
    path: 'founder',
    loadChildren: () =>
      import('../auth-access/auth-access.module').then(
        (m) => m.AuthAccessModule
      ),
    canActivate: [founderUnauthGuard],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('../admin-access/admin-access.module').then(
        (m) => m.AdminAccessModule
      ),
    canActivate: [adminUnauthGuard],
  },
  {
    path: '',
    redirectTo: 'founder',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthShellRoutingModule {}
