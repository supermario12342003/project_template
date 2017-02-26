"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var HttpService = (function (_super) {
    __extends(HttpService, _super);
    function HttpService(backend, options) {
        _super.call(this, backend, options);
        options.headers.set('Content-Type', 'application/json');
        this.authenticateHeaders(options.headers);
    }
    HttpService.prototype.authenticateHeaders = function (headers) {
        var token = localStorage.getItem('authToken');
        if (token)
            headers.set('Authorization', 'Token ' + token);
    };
    HttpService.prototype.request = function (url, options) {
        if (typeof url === 'string') {
            if (!options) {
                options = { headers: new http_1.Headers() };
            }
            this.authenticateHeaders(options.headers);
        }
        else {
            this.authenticateHeaders(url.headers);
        }
        //return super.request(url, options).catch(this.catchAuthError(this));
        return _super.prototype.request.call(this, url, options);
    };
    HttpService.prototype.catchAuthError = function (self) {
        return function (res) {
            if (res.status === 401 || res.status === 403) {
                // if not authenticated
                console.log(res);
            }
            return Observable_1.Observable.throw(res);
        };
    };
    HttpService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.XHRBackend, http_1.RequestOptions])
    ], HttpService);
    return HttpService;
}(http_1.Http));
exports.HttpService = HttpService;
function HttpServiceFactory(backend, options) {
    return new HttpService(backend, options);
}
exports.HttpServiceFactory = HttpServiceFactory;
exports.HttpServiceProvider = {
    provide: HttpService,
    useFactory: HttpServiceFactory,
    deps: [http_1.XHRBackend, http_1.RequestOptions]
};
exports.XSRFStrategyProvider = {
    provide: http_1.XSRFStrategy,
    useValue: new http_1.CookieXSRFStrategy('csrftoken', 'X-CSRFToken'),
};
//# sourceMappingURL=http.service.js.map