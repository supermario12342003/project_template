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
var router_1 = require('@angular/router');
var forms_1 = require('@angular/forms');
var index_1 = require('../_services/index');
var EditProfileComponent = (function () {
    function EditProfileComponent(route, router, authenticationService, alertService, fb) {
        this.route = route;
        this.router = router;
        this.authenticationService = authenticationService;
        this.alertService = alertService;
        this.fb = fb;
        this.loading = false;
        this.formErrors = {
            'phone': '',
            'first_name': '',
            'last_name': '',
        };
        this.validationMessages = {
            'phone': {
                'pattern': 'Phone should at least 10 digits including country code, eg 3301234567',
            },
            'first_name': {
                'minlength': 'First name must be at least 2 characters long.',
                'maxlength': 'First name cannot be more than 30 characters long.',
            },
            'last_name': {
                'minlength': 'Last name must be at least 2 characters long.',
                'maxlength': 'Last name cannot be more than 30 characters long.',
            },
        };
    }
    EditProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.user = this.authenticationService.getUser();
        var phoneRegex = '^\\+?\\d{10,14}$';
        this.myForm = this.fb.group({
            'phone': [this.user.phone, [
                    forms_1.Validators.pattern(phoneRegex),
                ]
            ],
            'first_name': [this.user.first_name, [
                    forms_1.Validators.minLength(2),
                    forms_1.Validators.maxLength(30),
                ]
            ],
            'last_name': [this.user.last_name, [
                    forms_1.Validators.maxLength(30),
                    forms_1.Validators.minLength(2),
                ]
            ],
        });
        this.myForm.valueChanges
            .subscribe(function (data) { return _this._onValueChanged(_this.myForm, data); });
    };
    EditProfileComponent.prototype._onValueChanged = function (form, data) {
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
    EditProfileComponent.prototype.submitForm = function (formValue) {
        var _this = this;
        this.loading = true;
        this.user.phone = formValue.phone;
        this.user.first_name = formValue.first_name;
        this.user.last_name = formValue.last_name;
        this.authenticationService.put(this.user)
            .subscribe(function (data) {
            _this.alertService.success("Profile is edited successfully");
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    EditProfileComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'edit-profile.component.html',
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, index_1.AuthenticationService, index_1.AlertService, forms_1.FormBuilder])
    ], EditProfileComponent);
    return EditProfileComponent;
}());
exports.EditProfileComponent = EditProfileComponent;
//# sourceMappingURL=edit-profile.component.js.map