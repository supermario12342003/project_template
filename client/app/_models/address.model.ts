import { EventEmitter } from '@angular/core';

export class Address {

	pos: Position;
	formatted_address:string;
	country:string;
	country_code:string;
	place_id:string;

	constructor(place:Object=null, pos?:Position) {
		if (place) {
			if (pos) {
				this.pos = pos;
			}
			else {
				this.pos = new Position(
					place['geometry']['location'].lat(),
					place['geometry']['location'].lng()
				);
			}
			this.formatted_address = place['formatted_address'];
			for (let c in place['address_components']) {
				for (let type in c['types']) {
					if (type == "country") {
						this.country = c['long_name'];
						this.country_code = c['short_name'];
						break ;
					}
				}
				if (this.country)
					break ;
			}
			this.place_id = place['place_id'];
		}
    }
}

export class Position {
	lat:number;
	lng:number;

	constructor(lat:number, lng:number) {
		this.lat = lat;
		this.lng = lng;
    }
}

export class Marker {
	pos: Position;
	image: string;
	onClick: ()=>void;
	//color...

	constructor(pos:Position, oc?:()=>void) {
		this.pos = pos;
		this.onClick = oc;
	}
}