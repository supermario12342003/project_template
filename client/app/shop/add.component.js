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
var router_1 = require('@angular/router');
var forms_1 = require('@angular/forms');
var address_model_1 = require('../_models/address.model');
var AddComponent = (function () {
    function AddComponent(shopService, authenticationService, alertService, fb, router, zone) {
        this.shopService = shopService;
        this.authenticationService = authenticationService;
        this.alertService = alertService;
        this.fb = fb;
        this.router = router;
        this.zone = zone;
        this.loading = false;
        this.markers = [];
        this.formErrors = {
            'name': '',
            'address': '',
            'category': '',
        };
        this.validationMessages = {
            'name': {
                'required': 'Shop name is required.',
            },
            'address': {
                'required': 'Address is required.',
                'addressNotSelected': 'Please select an address from the suggestion or the map',
            },
            'category': {
                'required': 'Category is required.',
            },
        };
    }
    AddComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.user = this.authenticationService.getUser();
        this.shopService.getCategories()
            .subscribe(function (data) {
            _this.categories = data;
        });
        this.myForm = this.fb.group({
            'name': ['', [
                    forms_1.Validators.required,
                ]
            ],
            'address': ['', [
                    forms_1.Validators.required,
                ]
            ],
            'lat': ['', [
                    forms_1.Validators.required,
                ]
            ],
            'lng': ['', [
                    forms_1.Validators.required,
                ]
            ],
            'category': ['', [
                    forms_1.Validators.required,
                ]
            ]
        });
        this.myForm.get('address').valueChanges
            .subscribe(function (data) { return _this._validateAddress(_this.myForm, data); });
        this.myForm.valueChanges
            .subscribe(function (data) { return _this._checkErrors(_this.myForm, data); });
    };
    AddComponent.prototype._validateAddress = function (form, data) {
        var add_ctrl = form.get('address');
        //if address is changed, then reset gps value
        if (this.address && add_ctrl.value != this.address.formatted_address) {
            this.myForm.patchValue({
                lng: null,
                lat: null,
            });
        }
        if (add_ctrl && add_ctrl.dirty && !form.get('lng').value) {
            add_ctrl.setErrors({ 'addressNotSelected': true });
        }
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
    AddComponent.prototype.getAddress = function (address) {
        var _this = this;
        this.zone.run(function () {
            _this._selectAddress(address);
        });
        this.center = address.pos;
    };
    AddComponent.prototype._selectAddress = function (address) {
        var _this = this;
        this.address = address;
        this.markers = [];
        var marker = new address_model_1.Marker(address.pos, function () {
            console.log(_this.address);
        });
        this.markers.push(marker);
        this.myForm.patchValue({
            address: address.formatted_address,
            lng: address.pos.lng,
            lat: address.pos.lat,
        });
        this.myForm.get('address').setErrors(null);
        this.formErrors['address'] = '';
    };
    AddComponent.prototype.submitForm = function (formValue) {
        var _this = this;
        this.loading = true;
        formValue['seller'] = this.user.id;
        this.shopService.create(formValue)
            .subscribe(function (data) {
            _this.alertService.success("Shop is added successfully", true);
            _this.router.navigate(['/product/shop/list']);
        }, function (error) {
            var errors = error.json().errors;
            for (var field in errors) {
                _this.formErrors[field] = errors[field][0];
            }
            _this.loading = false;
        });
    };
    AddComponent.prototype.onClick = function (address) {
        var _this = this;
        this.zone.run(function () {
            _this._selectAddress(address);
        });
    };
    AddComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'add.component.html',
        }), 
        __metadata('design:paramtypes', [shop_service_1.ShopService, authentication_service_1.AuthenticationService, alert_service_1.AlertService, forms_1.FormBuilder, router_1.Router, core_1.NgZone])
    ], AddComponent);
    return AddComponent;
}());
exports.AddComponent = AddComponent;
//# sourceMappingURL=add.component.js.map