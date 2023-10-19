import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ForgotPassComponent } from './forgot-pass.component';
import { TabContainerModule } from '../../ui/tab-container/tab-container.module';

@NgModule({
  declarations: [
    ForgotPassComponent
  ],
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
    TabContainerModule
  ]
})
export class ForgotPasswordModule { }
