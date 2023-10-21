import { NgModule } from '@angular/core';
import { AuthShellRoutingModule } from './auth-routing.module';
import { authReducer } from '../../data-access/state/auth.reducer';
import { StoreModule } from '@ngrx/store';

@NgModule({
  imports: [
    AuthShellRoutingModule,
    StoreModule.forFeature('auth', authReducer),
  ],
})
export class AuthShellModule {}
