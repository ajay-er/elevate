import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterModule } from './shared/ui/footer/footer.module';
import { NavModule } from './shared/ui/nav/nav.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FooterModule,
    NavModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({
      name: 'Elevate',
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
