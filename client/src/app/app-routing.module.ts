import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { unauthenticatedGuard } from './shared/guards/unauthenticated.guard';
import { authGuard } from './shared/guards/auth.guard';

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
    path: 'ideas',
    loadChildren: () =>
      import('./ideas/feature/idea-shell/idea-shell.module').then(
        (m) => m.IdeaShellModule
      ),
  },
  {
    path: '**',
    redirectTo: 'ideas',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
