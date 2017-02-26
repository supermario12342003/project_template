"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var app_routing_module_1 = require('./app-routing.module');
var app_component_1 = require('./app.component');
var nav_component_1 = require("./nav/nav.component");
var landing_component_1 = require("./landing/landing.component");
var page_not_found_component_1 = require("./page-not-found/page-not-found.component");
var index_1 = require('./_directives/index');
var auth_guard_1 = require('./_guards/auth.guard');
var core_2 = require('angular2-cookie/core');
var index_2 = require('./_services/index');
var index_3 = require('./account/index');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpModule,
                app_routing_module_1.AppRoutingModule,
            ],
            declarations: [
                app_component_1.AppComponent,
                nav_component_1.NavComponent,
                landing_component_1.LandingComponent,
                page_not_found_component_1.PageNotFoundComponent,
                index_1.AlertComponent,
                index_3.ProfileComponent,
                index_3.LoginComponent,
                index_3.RegisterComponent,
                index_3.EditProfileComponent,
                index_3.LogoutComponent,
                index_3.ProfileNavComponent,
                index_3.ChangePasswordComponent,
            ],
            providers: [
                auth_guard_1.AuthGuard,
                index_2.AlertService,
                core_2.CookieService,
                index_2.AuthenticationService,
                index_2.AccountService,
                index_2.HttpServiceProvider,
                index_2.XSRFStrategyProvider
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map