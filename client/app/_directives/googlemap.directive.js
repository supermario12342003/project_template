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
var GooglemapDirective = (function () {
    function GooglemapDirective(el) {
        var _this = this;
        this.onClick = new core_1.EventEmitter();
        this._defaultHeight = 400;
        this._defaultCenter = { lat: 48.8918918, lng: 2.321136000000024 };
        this._defaultZoom = 13;
        this._markers = [];
        var init = function () {
            if (typeof (_this.height) == 'undefined') {
                _this.height = _this._defaultHeight;
            }
            if (!_this.center || typeof (_this.center) == 'undefined') {
                _this.center = _this._defaultCenter;
            }
            if (typeof (_this.markers) != 'undefined') {
                for (var _i = 0, _a = _this.markers; _i < _a.length; _i++) {
                    var m = _a[_i];
                    _this.addMarker(m);
                }
            }
            _this._map = new google.maps.Map(el.nativeElement, {
                center: _this.center,
                zoom: _this._defaultZoom,
            });
            google.maps.event.addListener(_this._map, 'click', function (event) {
                var geocoder = new google.maps.Geocoder;
                geocoder.geocode({ 'location': event.latLng }, function (results, status) {
                    if (status === 'OK') {
                        _this.onClick.emit(new address_model_1.Address(results[0], 
                        //todo fix here, it get the formatted_address to closest to the point
                        new address_model_1.Position(event.latLng.lat(), event.latLng.lng())));
                    }
                });
            });
        };
        if (typeof (google) != 'undefined') {
            init();
        }
        else {
            this.async("google", init);
        }
    }
    GooglemapDirective.prototype.async = function (dataName, c) {
        var scriptElement = document.querySelector('script[data-name="' + dataName + '"]');
        if (scriptElement && c) {
            scriptElement.addEventListener('load', function (e) { c(); }, false);
        }
    };
    // Adds a marker to the map and push to the array.
    GooglemapDirective.prototype.addMarker = function (m) {
        var marker = new google.maps.Marker({
            position: m.pos,
        });
        if (typeof (m.onClick) == 'function') {
            google.maps.event.addListener(marker, 'click', function (event) {
                m.onClick();
            });
        }
        marker.setMap(this._map);
        this._markers.push(marker);
    };
    // Deletes all markers in the array by removing references to them.
    GooglemapDirective.prototype.deleteMarkers = function () {
        for (var _i = 0, _a = this._markers; _i < _a.length; _i++) {
            var m = _a[_i];
            m.setMap(null);
        }
        this._markers = [];
    };
    GooglemapDirective.prototype.ngOnChanges = function (changes) {
        if (changes['markers']) {
            this.deleteMarkers();
            for (var _i = 0, _a = this.markers; _i < _a.length; _i++) {
                var m = _a[_i];
                this.addMarker(m);
            }
        }
        if (changes['center']) {
            if (this.center && typeof (this.center) != 'undefined') {
                this._map.setCenter(new google.maps.LatLng(this.center.lat, this.center.lng));
            }
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', address_model_1.Position)
    ], GooglemapDirective.prototype, "center", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], GooglemapDirective.prototype, "markers", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], GooglemapDirective.prototype, "onClick", void 0);
    __decorate([
        core_1.HostBinding('style.height.px'), 
        __metadata('design:type', Number)
    ], GooglemapDirective.prototype, "height", void 0);
    GooglemapDirective = __decorate([
        core_1.Directive({
            selector: '[googlemap]',
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], GooglemapDirective);
    return GooglemapDirective;
}());
exports.GooglemapDirective = GooglemapDirective;
//# sourceMappingURL=googlemap.directive.js.map