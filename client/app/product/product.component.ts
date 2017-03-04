import { Component, NgZone }       		from '@angular/core';
import { AlertService }			from '../_services/alert.service';
import { ActivatedRoute, Params }   from '@angular/router';
import {  ShopService }  from '../_services/shop.service';
import {  AuthenticationService }  from '../_services/authentication.service';
import {  ProductService }	from '../_services/product.service';
import { Shop, }        from '../_models/shop.model';
import { User, }        from '../_models/user.model';
import { Product, }        from '../_models/product.model';
import 'rxjs/add/operator/switchMap';

@Component({
    moduleId: module.id,
    templateUrl: 'product.component.html',
})
export class ProductComponent {

	product:Product = new Product();
  user:User;

  constructor(
        private shopService: ShopService,
        private productService: ProductService,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private zone:NgZone,
        private route: ActivatedRoute,
	) {}

	ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.productService.getProduct(params['product_id']))
		  .subscribe(
        data => {
          this.product = data;
        },
        error => {
      		this.alertService.error(error);
        }
      );

	}
}
