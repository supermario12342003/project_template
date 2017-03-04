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
var product_service_1 = require('../_services/product.service');
var authentication_service_1 = require('../_services/authentication.service');
var router_1 = require('@angular/router');
var forms_1 = require('@angular/forms');
var shop_service_1 = require('../_services/shop.service');
var AddComponent = (function () {
    function AddComponent(productService, shopService, authenticationService, alertService, route, fb, router) {
        this.productService = productService;
        this.shopService = shopService;
        this.authenticationService = authenticationService;
        this.alertService = alertService;
        this.route = route;
        this.fb = fb;
        this.router = router;
        this.loading = false;
        this.formErrors = {
            'name': '',
        };
        this.validationMessages = {
            'name': {
                'required': 'Product name is required.',
            },
        };
    }
    AddComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.user = this.authenticationService.getUser();
        this.route.params
            .switchMap(function (params) { return _this.shopService.getShop(+params['shop_id']); })
            .subscribe(function (shop) {
            _this.shop = shop;
            if (_this.shop.seller != _this.user.id) {
                _this.router.navigate(['/404/']);
            }
        });
        this.myForm = this.fb.group({
            'name': ['', [
                    forms_1.Validators.required,
                ]
            ],
        });
        this.myForm.valueChanges
            .subscribe(function (data) { return _this._checkErrors(_this.myForm, data); });
    };
    AddComponent.prototype._checkErrors = function (form, data) {
        for (var field in this.formErrors) {
            this.formErrors[field] = '';
            var control = form.get(field);
            if (control && control.dirty && !control.valid) {
                var messages = this.validationMessages[field];
                for (var key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    };
    AddComponent.prototype.submitForm = function (formValue) {
        var _this = this;
        this.loading = true;
        formValue['shop'] = this.shop.id;
        this.productService.create(formValue)
            .subscribe(function (data) {
            _this.alertService.success("Product is added successfully", true);
            _this.router.navigate(['/shop', _this.shop.id]);
        }, function (error) {
            var errors = error.json().errors;
            for (var field in errors) {
                _this.formErrors[field] = errors[field][0];
            }
            _this.loading = false;
        });
    };
    AddComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'add.component.html',
        }), 
        __metadata('design:paramtypes', [product_service_1.ProductService, shop_service_1.ShopService, authentication_service_1.AuthenticationService, alert_service_1.AlertService, router_1.ActivatedRoute, forms_1.FormBuilder, router_1.Router])
    ], AddComponent);
    return AddComponent;
}());
exports.AddComponent = AddComponent;
//# sourceMappingURL=add.component.js.map