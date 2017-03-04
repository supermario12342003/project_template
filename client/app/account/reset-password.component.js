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
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var index_1 = require('../_services/index');
var ResetPasswordComponent = (function () {
    function ResetPasswordComponent(route, router, alertService, authenticationService, fb) {
        this.route = route;
        this.router = router;
        this.alertService = alertService;
        this.authenticationService = authenticationService;
        this.fb = fb;
        this.loading = false;
        this.formErrors = {
            'new_password': '',
            'new_password2': '',
        };
        this.validationMessages = {
            'new_password': {
                'required': 'New password is required.',
                'minlength': 'Password must be at least 5 characters long.',
                'maxlength': 'Password cannot be more than 20 characters long.',
                'same_new_password': 'New password cannot be the same as the old one.',
            },
            'new_password2': {
                'required': 'Confirmation of the new password is required.',
                'minlength': 'Password must be at least 5 characters long.',
                'maxlength': 'Password cannot be more than 20 characters long.',
                'missmatched_password': 'Passwords are not the same.',
            }
        };
    }
    ResetPasswordComponent.prototype.ngOnInit = function () {
        var _this = this;
        var emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
        this.reset_token = this.route.snapshot.queryParams['token'];
        this.email = this.route.snapshot.queryParams['email'];
        console.log("here");
        if (!this.reset_token || !this.email) {
            this.router.navigate(['/404/']);
        }
        this.myForm = this.fb.group({
            'new_password': ['', [
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(5),
                    forms_1.Validators.maxLength(20),
                ]
            ],
            'new_password2': ['', [
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(5),
                    forms_1.Validators.maxLength(20),
                ],
            ],
        }, {
            validator: this.validate(),
        });
        this.myForm.valueChanges
            .subscribe(function (data) { return _this._onValueChanged(_this.myForm, data); });
    };
    ResetPasswordComponent.prototype.validate = function () {
        return function (group) {
            var c_new = group.controls['new_password'];
            var c_new2 = group.controls['new_password2'];
            if (c_new.value !== c_new2.value) {
                return c_new2.setErrors({ 'missmatched_password': true });
            }
        };
    };
    ResetPasswordComponent.prototype._onValueChanged = function (form, data) {
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
    ResetPasswordComponent.prototype.submitForm = function (myForm) {
        var _this = this;
        this.loading = true;
        this.authenticationService.resetPassword(this.email, this.reset_token, myForm.new_password)
            .subscribe(function (data) {
            _this.alertService.success("Your password has been changed successfully", true);
            _this.loading = false;
            _this.router.navigate(['/profile/login']);
        }, function (error) {
            _this.loading = false;
            var errors = error.json().errors;
            for (var field in errors) {
                _this.formErrors[field] = errors[field][0];
            }
        });
    };
    ResetPasswordComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'reset-password.component.html',
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, index_1.AlertService, index_1.AuthenticationService, forms_1.FormBuilder])
    ], ResetPasswordComponent);
    return ResetPasswordComponent;
}());
exports.ResetPasswordComponent = ResetPasswordComponent;
//# sourceMappingURL=reset-password.component.js.map