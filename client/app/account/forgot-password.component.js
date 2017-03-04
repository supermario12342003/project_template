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
var ForgotPasswordComponent = (function () {
    function ForgotPasswordComponent(router, alertService, authenticationService, fb) {
        this.router = router;
        this.alertService = alertService;
        this.authenticationService = authenticationService;
        this.fb = fb;
        this.loading = false;
        this.formErrors = {
            'email': '',
        };
        this.validationMessages = {
            'email': {
                'required': 'Email is required.',
                'pattern': 'This is not a valid email address',
            },
        };
    }
    ForgotPasswordComponent.prototype.ngOnInit = function () {
        var _this = this;
        var emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
        this.forgotPasswordForm = this.fb.group({
            'email': ['', [
                    forms_1.Validators.required,
                    forms_1.Validators.pattern(emailRegex),
                ]
            ],
        });
        this.forgotPasswordForm.valueChanges
            .subscribe(function (data) { return _this._onValueChanged(_this.forgotPasswordForm, data); });
    };
    ForgotPasswordComponent.prototype._onValueChanged = function (form, data) {
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
    ForgotPasswordComponent.prototype.submitForm = function (forgotFormValue) {
        var _this = this;
        this.loading = true;
        this.authenticationService.forgotPassword(forgotFormValue.email)
            .subscribe(function (data) {
            _this.alertService.success("An password reset link has been sent to " + forgotFormValue.email, true);
            _this.loading = false;
            _this.router.navigate(['/']);
        }, function (error) {
            _this.loading = false;
            var errors = error.json().errors;
            for (var field in errors) {
                _this.formErrors[field] = errors[field][0];
            }
        });
    };
    ForgotPasswordComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'forgot-password.component.html',
        }), 
        __metadata('design:paramtypes', [router_1.Router, index_1.AlertService, index_1.AuthenticationService, forms_1.FormBuilder])
    ], ForgotPasswordComponent);
    return ForgotPasswordComponent;
}());
exports.ForgotPasswordComponent = ForgotPasswordComponent;
//# sourceMappingURL=forgot-password.component.js.map