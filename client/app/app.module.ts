import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { FormsModule }              from '@angular/forms';
import { HttpModule }               from '@angular/http';

import { AppRoutingModule }         from './app.route';

import { AppComponent }             from './app.component';
import { Component1Component }      from "./component1.component";
import { Component2Component }      from "./component2.component";
import { DjangoComponent }          from "./django.component";
import { NavComponent }             from "./nav/nav.component";
import { LandingComponent }         from "./landing/landing.component";
import { PageNotFoundComponent }    from "./page-not-found/page-not-found.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    Component1Component,
    Component2Component,
    DjangoComponent,
    NavComponent,
    LandingComponent,
    PageNotFoundComponent,
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }