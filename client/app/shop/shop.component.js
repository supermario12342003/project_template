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
var alert_service_1 = require('../_services/alert.service');
var router_1 = require('@angular/router');
var shop_service_1 = require('../_services/shop.service');
var authentication_service_1 = require('../_services/authentication.service');
var product_service_1 = require('../_services/product.service');
var shop_model_1 = require('../_models/shop.model');
require('rxjs/add/operator/switchMap');
var ShopComponent = (function () {
    function ShopComponent(shopService, productService, authenticationService, alertService, zone, route) {
        this.shopService = shopService;
        this.productService = productService;
        this.authenticationService = authenticationService;
        this.alertService = alertService;
        this.zone = zone;
        this.route = route;
        this.shop = new shop_model_1.Shop();
    }
    ShopComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.user = this.authenticationService.getUser();
        this.route.params
            .switchMap(function (params) { return _this.shopService.getShop(params['id']); })
            .subscribe(function (data) {
            _this.shop = data;
            _this.productService.myList(_this.shop.id)
                .subscribe(function (data) {
                _this.products = data;
            }, function (error) {
                _this.alertService.error(error);
            });
        }, function (error) {
            _this.alertService.error(error);
        });
    };
    ShopComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'shop.component.html',
        }), 
        __metadata('design:paramtypes', [shop_service_1.ShopService, product_service_1.ProductService, authentication_service_1.AuthenticationService, alert_service_1.AlertService, core_1.NgZone, router_1.ActivatedRoute])
    ], ShopComponent);
    return ShopComponent;
}());
exports.ShopComponent = ShopComponent;
//# sourceMappingURL=shop.component.js.map