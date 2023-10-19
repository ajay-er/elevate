import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { LoginRouteModule } from './login-routing.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [LoginRouteModule],
})
export class LoginModule {}
