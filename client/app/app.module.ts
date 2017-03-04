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
import { AccountModule }            from "./account/account.module"
import { AlertService, HttpServiceProvider, XSRFStrategyProvider }                  from './_services/index';
import { CookieService } from 'angular2-cookie/core';
import { AuthGuard }                from './_guards/auth.guard';
import {  AuthenticationService }    from './_services/authentication.service'
import { SharedModule }              from './shared/shared.module'
import { ShopModule }              from './shop/shop.module'
import { ProductModule }              from './product/product.module'



@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccountModule,
    SharedModule,
    ShopModule,
    ProductModule,
  ],
  declarations: [
    AppComponent,
    NavComponent,
    LandingComponent,
    PageNotFoundComponent,
    AlertComponent,
  ],
  providers: [
    AuthenticationService,
    CookieService,
    AlertService,
    HttpServiceProvider,
    XSRFStrategyProvider
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }