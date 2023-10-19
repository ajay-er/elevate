import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('../login/login-routing.module').then((m) => m.LoginRouteModule),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('../signup/signup-routing.module').then(
        (m) => m.SignupRoutingModule
      ),
  },
  {
    path: 'forgot',
    loadChildren: () =>
      import('../forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthShellRoutingModule {}
