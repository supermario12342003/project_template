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
var NavComponent = (function () {
    function NavComponent(authentication) {
        this.authentication = authentication;
    }
    NavComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.authentication.isAuthenticated$.subscribe(function (item) { return _this.isAuthenticated = item; });
        this.isAuthenticated = this.authentication.isAuthenticated();
        if (this.isAuthenticated) {
            this.user = this.authentication.getUser();
        }
    };
    NavComponent.prototype.ngOnDestroy = function () {
        // prevent memory leak when component is destroyed
        this.subscription.unsubscribe();
    };
    NavComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-nav',
            templateUrl: 'nav.component.html',
            styleUrls: ['../css/nav.css',]
        }), 
        __metadata('design:paramtypes', [index_1.AuthenticationService])
    ], NavComponent);
    return NavComponent;
}());
exports.NavComponent = NavComponent;
//# sourceMappingURL=nav.component.js.map