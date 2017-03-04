import { Component, NgZone }       		from '@angular/core';
import { AlertService }			from '../_services/alert.service';
import { ActivatedRoute, Params }   from '@angular/router';
import {  ShopService }  from '../_services/shop.service';
import {  AuthenticationService }  from '../_services/authentication.service';
import {  ProductService }	from '../_services/product.service';
import { Shop, }        from '../_models/shop.model';
import { User, }        from '../_models/user.model';
import { Product, }        from '../_models/product.model';
import { Address, Marker, Position }            from '../_models/address.model';
import 'rxjs/add/operator/switchMap';

@Component({
    moduleId: module.id,
    templateUrl: 'shop.component.html',
})
export class ShopComponent {

	shop:Shop = new Shop();
  user:User;
  products:Product[];

  constructor(
        private shopService: ShopService,
        private productService: ProductService,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private zone:NgZone,
        private route: ActivatedRoute,
	) {}

	ngOnInit() {
    this.user = this.authenticationService.getUser();
    this.route.params
      .switchMap((params: Params) => this.shopService.getShop(params['id']))
		  .subscribe(
        data => {
          this.shop = data;
          this.productService.myList(this.shop.id)
          .subscribe(
            data => {
               this.products = data;
            },
            error => {
              this.alertService.error(error);
            }
          );
        },
        error => {
      		this.alertService.error(error);
        }
      );

	}
}
