import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { EffectsModule } from "@ngrx/effects";
import { reducers, metaReducers } from "./shared/state";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './shared/material-module';
import { AzureStorageModule } from './azure-storage/azure-storage.module';
import { OriginatorInterceptor } from './shared/interceptors/originator.interceptor';
import { HttpErrorInterceptor } from './shared/interceptors/http-error.interceptor';
/* Feature Modules */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
/* Feature Controls */
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ConfigService, ConfigFactory, API_BASE_URL } from './shared/config.service';
import { AlertsComponent } from './alerts/alerts.component';
import {
  MsalModule,
  MsalInterceptor,
  MSAL_CONFIG,
  MSAL_CONFIG_ANGULAR,
  MsalService,
  MsalAngularConfiguration,
} from '@azure/msal-angular';
import { msalConfig, msalAngularConfig } from './app-config';
import { Configuration } from 'msal';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from './shared/auth/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

function MSALConfigFactory(): Configuration {
  return msalConfig;
}

function MSALAngularConfigFactory(): MsalAngularConfiguration {
  return msalAngularConfig;
}

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    AzureStorageModule,
    NgbModule,
    MsalModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([]),
  ],
  declarations: [
    AppComponent,
    NavBarComponent,
    AlertsComponent,
  ],
  exports: [MaterialModule, AzureStorageModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: OriginatorInterceptor,
      deps: [AuthService],
      multi: true },
    {provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: MSAL_CONFIG,
      useFactory: MSALConfigFactory
    },
    {
      provide: MSAL_CONFIG_ANGULAR,
      useFactory: MSALAngularConfigFactory
    },
    MsalService,
    ConfigService,
    {
      provide: 'BASE_API_URL_KEY',
      useValue: 'BASE_API_URL'
    },
    {
      provide: API_BASE_URL,
      useFactory: ConfigFactory,
      deps: [ConfigService, 'BASE_API_URL_KEY']
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
