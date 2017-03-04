import {Directive, ElementRef, Input, OnChanges, SimpleChanges, HostBinding, EventEmitter, Output } from '@angular/core';
import {NgModel} from '@angular/forms';
import { Address, Position, Marker } from '../_models/address.model'

declare var google:any;

@Directive({
  selector: '[googlemap]',
})
export class GooglemapDirective implements OnChanges {
  @Input() center: Position;
  @Input() markers: Marker[];
  @Output() onClick: EventEmitter<Address> = new EventEmitter();

  @HostBinding('style.height.px')
  height: number;

  private _defaultHeight: number = 400;
  private _defaultCenter: Position = {lat:48.8918918, lng:2.321136000000024};
  private _defaultZoom: number = 13;
  private _map: any;
  private _markers: any = [];

  async(dataName:string, c:()=>void) {
    var scriptElement = document.querySelector('script[data-name="' + dataName +  '"]');
    if (scriptElement && c) {
      scriptElement.addEventListener('load', function (e:any) { c(); }, false);
    }
  }

  // Adds a marker to the map and push to the array.
  addMarker(m: Marker) {
    var marker = new google.maps.Marker({
      position: m.pos,
    });
    if (typeof(m.onClick) == 'function') {
      google.maps.event.addListener(marker, 'click', (event:any) => {
        m.onClick();
      });
    }
    marker.setMap(this._map);
    this._markers.push(marker);
  }

  // Deletes all markers in the array by removing references to them.
  deleteMarkers() {
    for (let m of this._markers) {
      m.setMap(null);
    }
    this._markers = [];
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes['markers']){
      this.deleteMarkers();
      for (let m of this.markers) {
        this.addMarker(m)
      }
    }
    if (changes['center']) {
      if (this.center && typeof(this.center) != 'undefined') {
        this._map.setCenter(new google.maps.LatLng(this.center.lat, this.center.lng));
      }
    }
  }

  constructor(el: ElementRef) {
    let init = () => {
      if (typeof(this.height) == 'undefined') {
        this.height = this._defaultHeight;
      }
      if (!this.center || typeof(this.center) == 'undefined') {
        this.center = this._defaultCenter;
      }
      if (typeof(this.markers) != 'undefined') {
        for (let m of this.markers) {
          this.addMarker(m)
        }
      }
      this._map = new google.maps.Map(el.nativeElement, {
        center: this.center,
        zoom: this._defaultZoom,
      });
      google.maps.event.addListener(this._map, 'click', (event:any) => {
        var geocoder = new google.maps.Geocoder;
        geocoder.geocode({'location': event.latLng}, (results:any, status:any) => {
          if (status === 'OK') {
            this.onClick.emit(
              new Address(
                results[0],
                //todo fix here, it get the formatted_address to closest to the point
                new Position(event.latLng.lat(), event.latLng.lng())
              )
            );
          }
        });
      });
    }

    if (typeof(google) != 'undefined') {
      init();
    }
    else {
      this.async("google", init);
    }
  }
}