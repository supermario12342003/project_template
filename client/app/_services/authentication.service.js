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
var BehaviorSubject_1 = require('rxjs/BehaviorSubject');
require('rxjs/add/operator/map');
var User = (function () {
    function User() {
    }
    return User;
}());
exports.User = User;
var AuthenticationService = (function () {
    function AuthenticationService(http, router) {
        this.http = http;
        this.router = router;
        this._isAuthenticatedSource = new BehaviorSubject_1.BehaviorSubject(this.isAuthenticated());
        this.isAuthenticated$ = this._isAuthenticatedSource.asObservable();
    }
    AuthenticationService.prototype.login = function (email, password, remember) {
        var _this = this;
        if (remember === void 0) { remember = true; }
        return this.http.post('/api/accounts/login/', JSON.stringify({ "email": email, "password": password }))
            .map(function (response) {
            var user = response.json();
            if (user && user.token) {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('authToken');
                localStorage.setItem('currentUser', JSON.stringify(user));
                localStorage.setItem('authToken', user.token);
                _this._isAuthenticatedSource.next(true);
            }
            return user;
        });
    };
    AuthenticationService.prototype.register = function (email, password, phone) {
        var _this = this;
        return this.http.post('/api/accounts/register/', JSON.stringify({ "email": email, "password": password, "phone": phone }))
            .map(function (response) {
            var user = response.json();
            if (user && user.token) {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('authToken');
                localStorage.setItem('currentUser', JSON.stringify(user));
                localStorage.setItem('authToken', user.token);
                _this._isAuthenticatedSource.next(true);
            }
            return user;
        });
    };
    AuthenticationService.prototype.getUser = function () {
        if (this.isAuthenticated) {
            var currentUserStr = localStorage.getItem('currentUser');
            if (currentUserStr) {
                return JSON.parse(currentUserStr);
            }
        }
    };
    AuthenticationService.prototype.me = function () {
        var _this = this;
        return this.http.get('/api/accounts/me/', {})
            .map(function (response) {
            var user = response.json();
            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
            }
            else {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('authToken');
                _this._isAuthenticatedSource.next(false);
            }
            return user;
        });
    };
    AuthenticationService.prototype.put = function (user) {
        return this.http.put('/api/accounts/' + user.id + '/', JSON.stringify(user))
            .map(function (response) {
            var user = response.json();
            localStorage.setItem('currentUser', JSON.stringify(user));
            return user;
        });
    };
    AuthenticationService.prototype.changePassword = function (user_id, old_password, new_password) {
        return this.http.post('api/accounts/' + user_id + '/changepassword/', JSON.stringify({ old_password: old_password, new_password: new_password }));
    };
    AuthenticationService.prototype.isAuthenticated = function () {
        return (localStorage.getItem('authToken') != null);
    };
    AuthenticationService.prototype.logout = function (returnUrl) {
        if (returnUrl === void 0) { returnUrl = "/"; }
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('authToken');
        this._isAuthenticatedSource.next(false);
    };
    AuthenticationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_service_1.HttpService, router_1.Router])
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map