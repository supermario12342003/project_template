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
var address_model_1 = require('../_models/address.model');
var GoogleplaceDirective = (function () {
    function GoogleplaceDirective(el) {
        var _this = this;
        this.setAddress = new core_1.EventEmitter();
        var init = function () {
            var input = el.nativeElement;
            _this.autocomplete = new google.maps.places.Autocomplete(input, {});
            google.maps.event.addListener(_this.autocomplete, 'place_changed', function () {
                var place = _this.autocomplete.getPlace();
                _this.setAddress.emit(new address_model_1.Address(place));
            });
        };
        if (typeof (google) != 'undefined') {
            init();
        }
        else {
            this.async("google", init);
        }
    }
    GoogleplaceDirective.prototype.async = function (dataName, c) {
        var scriptElement = document.querySelector('script[data-name="' + dataName + '"]');
        if (scriptElement && c) {
            scriptElement.addEventListener('load', function (e) { c(); }, false);
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], GoogleplaceDirective.prototype, "setAddress", void 0);
    GoogleplaceDirective = __decorate([
        core_1.Directive({
            selector: '[googleplace]',
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], GoogleplaceDirective);
    return GoogleplaceDirective;
}());
exports.GoogleplaceDirective = GoogleplaceDirective;
//# sourceMappingURL=googleplace.directive.js.map