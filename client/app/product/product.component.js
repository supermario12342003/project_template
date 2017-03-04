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
var product_model_1 = require('../_models/product.model');
require('rxjs/add/operator/switchMap');
var ProductComponent = (function () {
    function ProductComponent(shopService, productService, authenticationService, alertService, zone, route) {
        this.shopService = shopService;
        this.productService = productService;
        this.authenticationService = authenticationService;
        this.alertService = alertService;
        this.zone = zone;
        this.route = route;
        this.product = new product_model_1.Product();
    }
    ProductComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.productService.getProduct(params['product_id']); })
            .subscribe(function (data) {
            _this.product = data;
        }, function (error) {
            _this.alertService.error(error);
        });
    };
    ProductComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'product.component.html',
        }), 
        __metadata('design:paramtypes', [shop_service_1.ShopService, product_service_1.ProductService, authentication_service_1.AuthenticationService, alert_service_1.AlertService, core_1.NgZone, router_1.ActivatedRoute])
    ], ProductComponent);
    return ProductComponent;
}());
exports.ProductComponent = ProductComponent;
//# sourceMappingURL=product.component.js.map