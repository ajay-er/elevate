import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { unauthenticatedGuard } from './shared/guards/unauthenticated.guard';
import { NotFoundComponent } from './shared/ui/not-found/not-found.component';
import { adminAuthGuard } from './shared/guards/admin-auth.guard';

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
    canActivate: [unauthenticatedGuard],
  },
  {
    path: 'founders',
    loadChildren: () =>
      import('./founders/feature/founders-shell/founders-shell.module').then(
        (m) => m.FoundersShellModule
      ),
  },
  {
    path: 'investors',
    loadChildren: () =>
      import('./investors/feature/investors-shell/investors-shell.module').then(
        (m) => m.InvestorsShellModule
      ),
  },
  {
    path: 'ideas',
    loadChildren: () =>
      import('./ideas/feature/idea-shell/idea-shell.module').then(
        (m) => m.IdeaShellModule
      ),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/feature/admin-shell/admin-shell.module').then(
        (m) => m.AdminShellModule
      ),
    canActivate: [adminAuthGuard],
    data: { layout: 'admin' },
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
