import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/ui/not-found/not-found.component';
import { adminAuthGuard } from './shared/guards/admin-auth.guard';
import { roleLayoutResolver } from './shared/resolvers/role-layout.resolver';
import { investorAuthGuard } from './shared/guards/investor-auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'ideas',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/feature/auth-shell/auth-shell.module').then(
        (m) => m.AuthShellModule
      ),
    resolve: { layout: roleLayoutResolver },
  },
  {
    path: 'founder',
    loadChildren: () =>
      import('./founders/feature/founders-shell/founders-shell.module').then(
        (m) => m.FoundersShellModule
      ),
    resolve: { layout: roleLayoutResolver },
  },
  {
    path: 'investor',
    loadChildren: () =>
      import('./investors/feature/investors-shell/investors-shell.module').then(
        (m) => m.InvestorsShellModule
      ),
    canActivate: [investorAuthGuard],
    resolve: { layout: roleLayoutResolver },
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/feature/admin-shell/admin-shell.module').then(
        (m) => m.AdminShellModule
      ),
    canActivate: [adminAuthGuard],
    resolve: { layout: roleLayoutResolver },
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
