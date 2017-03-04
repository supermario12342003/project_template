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
var common_1 = require('@angular/common');
var index_1 = require('./index');
var router_1 = require('@angular/router');
var auth_guard_1 = require('../_guards/auth.guard');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
exports.ACCOUNT_ROUTES = [
    { path: 'login', component: index_1.LoginComponent },
    { path: 'register', component: index_1.RegisterComponent },
    { path: 'forgot_password', component: index_1.ForgotPasswordComponent },
    { path: 'reset_password', component: index_1.ResetPasswordComponent },
    { path: '', component: index_1.ProfileNavComponent, canActivate: [auth_guard_1.AuthGuard],
        children: [
            { path: 'shop', loadChildren: 'app/shop/shop.module#ShopModule', canActivate: [auth_guard_1.AuthGuard] },
            { path: '', component: index_1.ProfileComponent, },
            { path: 'edit', component: index_1.EditProfileComponent, },
            { path: 'changepassword', component: index_1.ChangePasswordComponent, },
            { path: 'logout', component: index_1.LogoutComponent },
        ]
    },
];
var AccountModule = (function () {
    function AccountModule() {
    }
    AccountModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpModule,
                router_1.RouterModule.forChild(exports.ACCOUNT_ROUTES)
            ],
            declarations: [
                index_1.ProfileComponent,
                index_1.LoginComponent,
                index_1.RegisterComponent,
                index_1.EditProfileComponent,
                index_1.LogoutComponent,
                index_1.ProfileNavComponent,
                index_1.ChangePasswordComponent,
                index_1.ForgotPasswordComponent,
                index_1.ResetPasswordComponent,
            ],
            providers: [
                auth_guard_1.AuthGuard,
            ],
        }), 
        __metadata('design:paramtypes', [])
    ], AccountModule);
    return AccountModule;
}());
exports.AccountModule = AccountModule;
//# sourceMappingURL=account.module.js.map