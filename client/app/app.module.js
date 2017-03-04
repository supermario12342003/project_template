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
var app_routing_module_1 = require('./app-routing.module');
var app_component_1 = require('./app.component');
var nav_component_1 = require("./nav/nav.component");
var landing_component_1 = require("./landing/landing.component");
var page_not_found_component_1 = require("./page-not-found/page-not-found.component");
var index_1 = require('./_directives/index');
var account_module_1 = require("./account/account.module");
var index_2 = require('./_services/index');
var core_2 = require('angular2-cookie/core');
var authentication_service_1 = require('./_services/authentication.service');
var shared_module_1 = require('./shared/shared.module');
var shop_module_1 = require('./shop/shop.module');
var product_module_1 = require('./product/product.module');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                account_module_1.AccountModule,
                shared_module_1.SharedModule,
                shop_module_1.ShopModule,
                product_module_1.ProductModule,
            ],
            declarations: [
                app_component_1.AppComponent,
                nav_component_1.NavComponent,
                landing_component_1.LandingComponent,
                page_not_found_component_1.PageNotFoundComponent,
                index_1.AlertComponent,
            ],
            providers: [
                authentication_service_1.AuthenticationService,
                core_2.CookieService,
                index_2.AlertService,
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