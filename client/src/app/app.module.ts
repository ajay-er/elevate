import {
  CUSTOM_ELEMENTS_SCHEMA,
  ErrorHandler,
  NgModule,
  isDevMode,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterModule } from './core/footer/footer.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './shared/data-access/state/auth/auth.effects';
import { authReducer } from './shared/data-access/state/auth/auth.reducer';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { errorReducer } from './shared/data-access/state/error/error.reducer';
import { GlobalErrorHandler } from './shared/data-access/global-error-handler.service';
import { SpinnerInterceptor } from './shared/interceptors/spinner.interceptor';
import { SpinnerModule } from './shared/ui/spinner/spinner.module';
import { LoadingButtonInterceptor } from './shared/interceptors/loading-button.interceptor';
import { AdminNavModule } from './core/admin-nav/admin-nav.module';
import { AdminAsideModule } from './core/admin-aside/admin-aside.module';
import { RouterModule } from '@angular/router';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { NavModule } from './core/nav/nav.module';
import { InvestorAsideModule } from './core/investor-aside/investor-aside.module';
import { InvestorNavModule } from './core/investor-nav/investor-nav.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FooterModule,
    NavModule,
    AdminNavModule,
    AdminAsideModule,
    InvestorAsideModule,
    InvestorNavModule,
    HttpClientModule,
    StoreModule.forRoot({}, {}),
    StoreModule.forFeature('auth', authReducer),
    StoreModule.forFeature('error', errorReducer),
    StoreDevtoolsModule.instrument({
      name: 'Elevate',
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
    EffectsModule.forRoot([AuthEffects]),
    MatSnackBarModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    SpinnerModule,
    RouterModule,
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingButtonInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
