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
var RegisterComponent = (function () {
    function RegisterComponent(route, router, authenticationService, alertService, fb) {
        this.route = route;
        this.router = router;
        this.authenticationService = authenticationService;
        this.alertService = alertService;
        this.fb = fb;
        this.loading = false;
        this.formErrors = {
            'email': '',
            'password': '',
            'password2': '',
            'phone': '',
        };
        this.validationMessages = {
            'email': {
                'required': 'Email is required.',
                'pattern': 'This is not a valid email address',
            },
            'phone': {
                'pattern': 'Phone should at least 10 digits including country code, eg 3301234567',
            },
            'password': {
                'required': 'Password is required.',
                'minlength': 'Password must be at least 5 characters long.',
                'maxlength': 'Password cannot be more than 20 characters long.',
            },
            'password2': {
                'required': 'Password is required.',
                'minlength': 'Password must be at least 5 characters long.',
                'maxlength': 'Password cannot be more than 20 characters long.',
                'missmatchedPasswords': 'Passwords are not the same.',
            },
        };
    }
    RegisterComponent.prototype.ngOnInit = function () {
        var _this = this;
        var emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
        var phoneRegex = '^\\+?\\d{10,14}$';
        this.passwordForm = this.fb.group({
            'password': ['', [
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(5),
                    forms_1.Validators.maxLength(20)
                ]
            ],
            'password2': ['', [
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(5),
                    forms_1.Validators.maxLength(20),
                ]
            ] }, {
            validator: this._matchingPasswords('password', 'password2')
        });
        this.myForm = this.fb.group({
            'email': ['', [
                    forms_1.Validators.required,
                    forms_1.Validators.pattern(emailRegex),
                ]
            ],
            'phone': ['', [
                    forms_1.Validators.pattern(phoneRegex),
                ]
            ],
        });
        this.myForm.valueChanges
            .subscribe(function (data) { return _this._onValueChanged(_this.myForm, data); });
        this.passwordForm.valueChanges
            .subscribe(function (data) { return _this._onValueChanged(_this.passwordForm, data); });
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/profile';
    };
    RegisterComponent.prototype._matchingPasswords = function (passwordKey, passwordConfirmationKey) {
        return function (group) {
            var passwordInput = group.controls[passwordKey];
            var passwordConfirmationInput = group.controls[passwordConfirmationKey];
            if (passwordInput.value !== passwordConfirmationInput.value) {
                return passwordConfirmationInput.setErrors({ missmatchedPasswords: true });
            }
        };
    };
    RegisterComponent.prototype._onValueChanged = function (form, data) {
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
    RegisterComponent.prototype.submitForm = function (formValue, passwordFormValue) {
        var _this = this;
        this.loading = true;
        this.authenticationService.register(formValue.email, passwordFormValue.password, formValue.phone)
            .subscribe(function (data) {
            _this.router.navigate([_this.returnUrl]);
        }, function (error) {
            var errors = error.json().errors;
            for (var field in errors) {
                _this.formErrors[field] = errors[field][0];
            }
            _this.loading = false;
        });
    };
    RegisterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'register.component.html',
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, index_1.AuthenticationService, index_1.AlertService, forms_1.FormBuilder])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map