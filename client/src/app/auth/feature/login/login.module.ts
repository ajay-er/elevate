import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { LoginRouteModule } from './login-routing.module';
import { CommonModule } from '@angular/common';
import { TabContainerModule } from '../../ui/tab-container/tab-container.module';
import { LoginFormModule } from '../../ui/login-form/login-form.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRouteModule,
    TabContainerModule,
    LoginFormModule,
  ],
})
export class LoginModule {}
