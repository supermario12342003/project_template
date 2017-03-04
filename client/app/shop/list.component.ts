import { Component, NgZone }       		from '@angular/core';
import { AlertService }			from '../_services/alert.service';
import {  ShopService }  from '../_services/shop.service';
import {  AuthenticationService }	from '../_services/authentication.service';
import { Shop, }        from '../_models/shop.model';
import { Address, Marker, Position }            from '../_models/address.model';
import { User }                  from '../_models/user.model';

@Component({
    moduleId: module.id,
    templateUrl: 'list.component.html',
})
export class ListComponent {

	shops:Shop[];
  user: User;

  constructor(
        private shopService: ShopService,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private zone:NgZone,
	) {}

	ngOnInit() {
    this.user = this.authenticationService.getUser();
		this.shopService.myList(this.user.id)
		.subscribe(
          data => {
              this.shops = data;
          },
          error => {
          		this.alertService.error(error);
          });
	}
}
