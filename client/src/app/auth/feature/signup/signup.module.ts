import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { TabContainerModule } from '../../ui/tab-container/tab-container.module';
import { SignupFormModule } from '../../ui/signup-form/signup-form.module';

@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    SignupRoutingModule,
    TabContainerModule,
    SignupFormModule,
  ],
})
export class SignupModule {}
