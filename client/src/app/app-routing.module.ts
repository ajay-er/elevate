import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { unauthenticatedGuard } from './shared/guards/unauthenticated.guard';
import { NotFoundComponent } from './shared/ui/not-found/not-found.component';

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
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
