import { CUSTOM_ELEMENTS_SCHEMA, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterModule } from './shared/ui/footer/footer.module';
import { NavModule } from './shared/ui/nav/nav.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
  GoogleLoginProvider,
} from '@abacritt/angularx-social-login';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './shared/data-access/state/auth/auth.effects';
import { authReducer } from './shared/data-access/state/auth/auth.reducer';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { errorReducer } from './shared/data-access/state/error/error.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FooterModule,
    NavModule,
    HttpClientModule,
    StoreModule.forRoot({}, {}),
    StoreModule.forFeature('auth', authReducer),
    StoreModule.forFeature('error', errorReducer),
    StoreDevtoolsModule.instrument({
      name: 'Elevate',
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
    SocialLoginModule,
    EffectsModule.forRoot([AuthEffects]),
    MatSnackBarModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '136905288035-rfcs7jag9gh9e4ne4454jri50lec2p9s.apps.googleusercontent.com'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
