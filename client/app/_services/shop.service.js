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
var http_service_1 = require('./http.service');
var router_1 = require('@angular/router');
require('rxjs/add/operator/map');
var ShopService = (function () {
    function ShopService(http, router) {
        this.http = http;
        this.router = router;
    }
    ShopService.prototype.create = function (shop) {
        return this.http.post('/api/shops/', JSON.stringify(shop))
            .map(function (response) {
            return response.json();
        });
    };
    ShopService.prototype.list = function () {
        return this.http.get('/api/shops/')
            .map(function (response) {
            return response.json();
        });
    };
    ShopService.prototype.myList = function (sellerId) {
        return this.http.get('/api/shops/' + sellerId + '/seller/')
            .map(function (response) {
            return response.json();
        });
    };
    ShopService.prototype.getShop = function (id) {
        return this.http.get('/api/shops/' + id + '/')
            .map(function (response) {
            return response.json();
        });
    };
    ShopService.prototype.getCategories = function () {
        return this.http.get('/api/shops/categories/')
            .map(function (response) {
            return response.json();
        });
    };
    ShopService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_service_1.HttpService, router_1.Router])
    ], ShopService);
    return ShopService;
}());
exports.ShopService = ShopService;
//# sourceMappingURL=shop.service.js.map