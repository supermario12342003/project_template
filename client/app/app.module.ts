import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { FormsModule,
    ReactiveFormsModule }           from '@angular/forms';
import { HttpModule }               from '@angular/http';

import { AppRoutingModule }         from './app-routing.module';

import { AppComponent }             from './app.component';
import { NavComponent }             from "./nav/nav.component";
import { LandingComponent }         from "./landing/landing.component";
import { PageNotFoundComponent }    from "./page-not-found/page-not-found.component";
import { AlertComponent }           from './_directives/index';
import { AuthGuard }                from './_guards/auth.guard';
import {CookieService} from 'angular2-cookie/core';
import { AlertService, AuthenticationService,
  AccountService, HttpServiceProvider, XSRFStrategyProvider }                  from './_services/index';

import { ProfileComponent, LoginComponent,
  RegisterComponent, EditProfileComponent,
  LogoutComponent, ProfileNavComponent, ChangePasswordComponent }               from './account/index';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    NavComponent,
    LandingComponent,
    PageNotFoundComponent,
    AlertComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    EditProfileComponent,
    LogoutComponent,
    ProfileNavComponent,
    ChangePasswordComponent,
  ],
  providers: [
    AuthGuard,
    AlertService,
    CookieService,
    AuthenticationService,
    AccountService,
    HttpServiceProvider,
    XSRFStrategyProvider
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }