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
var http_1 = require('@angular/http');
var AccountService = (function () {
    function AccountService(http) {
        this.http = http;
    }
    AccountService.prototype.getAll = function () {
        return this.http.get('/api/accounts', this.jwt()).map(function (response) { return response.json(); });
    };
    AccountService.prototype.getById = function (id) {
        return this.http.get('/api/accounts/' + id, this.jwt()).map(function (response) { return response.json(); });
    };
    AccountService.prototype.create = function (account) {
        return this.http.post('/api/accounts', account, this.jwt()).map(function (response) { return response.json(); });
    };
    AccountService.prototype.update = function (account) {
        return this.http.put('/api/accounts/' + account.id, account, this.jwt()).map(function (response) { return response.json(); });
    };
    AccountService.prototype.delete = function (id) {
        return this.http.delete('/api/accounts/' + id, this.jwt()).map(function (response) { return response.json(); });
    };
    // private helper methods
    AccountService.prototype.jwt = function () {
        // create authorization header with jwt token
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            var headers = new http_1.Headers({ 'Authorization': 'Token ' + currentUser.token });
            return new http_1.RequestOptions({ headers: headers });
        }
    };
    AccountService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AccountService);
    return AccountService;
}());
exports.AccountService = AccountService;
//# sourceMappingURL=account.service.js.map