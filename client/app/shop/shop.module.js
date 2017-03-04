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
var list_component_1 = require('./list.component');
var add_component_1 = require('./add.component');
var shop_component_1 = require('./shop.component');
var router_1 = require('@angular/router');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var shop_service_1 = require('../_services/shop.service');
var shared_module_1 = require('../shared/shared.module');
exports.SHOP_ROUTES = [
    { path: 'list', component: list_component_1.ListComponent },
    { path: 'add', component: add_component_1.AddComponent },
];
var ShopModule = (function () {
    function ShopModule() {
    }
    ShopModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpModule,
                router_1.RouterModule.forChild(exports.SHOP_ROUTES)
            ],
            declarations: [
                list_component_1.ListComponent,
                add_component_1.AddComponent,
                shop_component_1.ShopComponent,
            ],
            providers: [
                shop_service_1.ShopService,
            ],
        }), 
        __metadata('design:paramtypes', [])
    ], ShopModule);
    return ShopModule;
}());
exports.ShopModule = ShopModule;
//# sourceMappingURL=shop.module.js.map