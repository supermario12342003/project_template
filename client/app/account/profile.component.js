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
var index_1 = require('../_services/index');
var ProfileNavComponent = (function () {
    function ProfileNavComponent() {
    }
    ProfileNavComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'profile-nav.component.html',
        }), 
        __metadata('design:paramtypes', [])
    ], ProfileNavComponent);
    return ProfileNavComponent;
}());
exports.ProfileNavComponent = ProfileNavComponent;
var ProfileComponent = (function () {
    function ProfileComponent(authenticationService, alertService) {
        this.authenticationService = authenticationService;
        this.alertService = alertService;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authenticationService.me()
            .subscribe(function (user) {
            _this.user = user;
            console.log(_this.user);
        }, function (error) {
            _this.alertService.error(error);
        });
    };
    ProfileComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'profile.component.html',
        }), 
        __metadata('design:paramtypes', [index_1.AuthenticationService, index_1.AlertService])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map