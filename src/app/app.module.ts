import { AdminModule } from './admin/admin.module';
import { ParkingSpaceModule } from './parking-spaces/parking-spaces.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import {UnauthModule} from './unauth/unauth.module';

registerLocaleData(localeDe, 'de-DE', localeDeExtra);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ParkingSpaceModule,
    AdminModule,
    SharedModule.forRoot(),
    UnauthModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'de-de' }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
