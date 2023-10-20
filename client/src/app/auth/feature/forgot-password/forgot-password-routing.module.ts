import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPassComponent } from './forgot-pass.component';

const routes: Routes = [
  {
    path: '',
    component: ForgotPassComponent,
  },
  {
    path: 'verify-otp',
    loadChildren: () =>
      import('../otp-verify/otp-verify.module').then((m) => m.OtpVerifyModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgotPasswordRoutingModule {}
