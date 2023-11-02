import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from 'src/app/shared/guards/auth.guard';

const routes: Routes = [
  {
    path: 'profile',
    loadChildren: () =>
      import('../profile-container/profile-container.module').then(
        (m) => m.ProfileContainerModule
      ),
    canActivate: [authGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('../founders-list/founders-list.module').then(
        (m) => m.FoundersListModule
      ),
  },
  {
    path: '',
    redirectTo: 'founders',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoundersShellRoutingModule {}
