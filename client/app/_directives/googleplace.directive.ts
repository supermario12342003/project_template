import {Directive, ElementRef, EventEmitter, Output, Input} from '@angular/core';
import {NgModel} from '@angular/forms';
import { Address } from '../_models/address.model'

declare var google:any;

@Directive({
  selector: '[googleplace]',
})
export class GoogleplaceDirective  {
  @Output() setAddress: EventEmitter<Address> = new EventEmitter();
  autocomplete:any;

  async(dataName:string, c:()=>void) {
    var scriptElement = document.querySelector('script[data-name="' + dataName +  '"]');
    if (scriptElement && c) {
      scriptElement.addEventListener('load', function (e:any) { c(); }, false);
    }
  }

  constructor(el: ElementRef) {
    let init = () => {
      var input = el.nativeElement;
      this.autocomplete = new google.maps.places.Autocomplete(input, {});
      google.maps.event.addListener(this.autocomplete, 'place_changed', ()=> {
        var place = this.autocomplete.getPlace();
        this.setAddress.emit(new Address(place));
      });
    };
    if (typeof(google) != 'undefined') {
      init();
    }
    else {
      this.async("google", init);
    }
  }
}