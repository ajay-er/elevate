import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtpVerifyComponent } from './otp-verify.component';

const routes: Routes = [
  {
    path: '',
    component: OtpVerifyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtpVerifyRoutingModule {}
