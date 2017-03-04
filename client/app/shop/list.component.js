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
var shop_service_1 = require('../_services/shop.service');
var authentication_service_1 = require('../_services/authentication.service');
var ListComponent = (function () {
    function ListComponent(shopService, authenticationService, alertService, zone) {
        this.shopService = shopService;
        this.authenticationService = authenticationService;
        this.alertService = alertService;
        this.zone = zone;
    }
    ListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.user = this.authenticationService.getUser();
        this.shopService.myList(this.user.id)
            .subscribe(function (data) {
            _this.shops = data;
        }, function (error) {
            _this.alertService.error(error);
        });
    };
    ListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'list.component.html',
        }), 
        __metadata('design:paramtypes', [shop_service_1.ShopService, authentication_service_1.AuthenticationService, alert_service_1.AlertService, core_1.NgZone])
    ], ListComponent);
    return ListComponent;
}());
exports.ListComponent = ListComponent;
//# sourceMappingURL=list.component.js.map