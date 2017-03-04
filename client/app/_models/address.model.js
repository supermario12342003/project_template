"use strict";
var Address = (function () {
    function Address(place, pos) {
        if (place === void 0) { place = null; }
        if (place) {
            if (pos) {
                this.pos = pos;
            }
            else {
                this.pos = new Position(place['geometry']['location'].lat(), place['geometry']['location'].lng());
            }
            this.formatted_address = place['formatted_address'];
            for (var c in place['address_components']) {
                for (var type in c['types']) {
                    if (type == "country") {
                        this.country = c['long_name'];
                        this.country_code = c['short_name'];
                        break;
                    }
                }
                if (this.country)
                    break;
            }
            this.place_id = place['place_id'];
        }
    }
    return Address;
}());
exports.Address = Address;
var Position = (function () {
    function Position(lat, lng) {
        this.lat = lat;
        this.lng = lng;
    }
    return Position;
}());
exports.Position = Position;
var Marker = (function () {
    //color...
    function Marker(pos, oc) {
        this.pos = pos;
        this.onClick = oc;
    }
    return Marker;
}());
exports.Marker = Marker;
//# sourceMappingURL=address.model.js.map