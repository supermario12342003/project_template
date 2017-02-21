import { NgModule }            				from '@angular/core';
import { RouterModule, Routes }				from '@angular/router';
import { LandingComponent }					from "./landing/landing.component";
import { Component2Component }				from "./component2.component";
import { DjangoComponent }					from "./django.component";
import { PageNotFoundComponent }		    from "./page-not-found/page-not-found.component";


const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'component2', component: Component2Component },
  { path: 'djcomponent', component: DjangoComponent },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
