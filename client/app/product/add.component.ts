import { Component, NgZone }       		from '@angular/core';
import { AlertService }			from '../_services/alert.service';
import {  ProductService }  from '../_services/product.service';
import {  AuthenticationService }	from '../_services/authentication.service';
import { Router, ActivatedRoute,Params }        from '@angular/router';
import { FormBuilder, FormGroup, Validators }   from '@angular/forms';
import { User }                  from '../_models/user.model';
import { Shop }                  from '../_models/shop.model';
import {  ShopService }  from '../_services/shop.service';



@Component({
    moduleId: module.id,
    templateUrl: 'add.component.html',
})
export class AddComponent {

  myForm: FormGroup;
  loading = false;
  user: User;
  shop: Shop;

    constructor(
        private productService: ProductService,
        private shopService: ShopService,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private router: Router,

	) {}

  ngOnInit() {
    this.user = this.authenticationService.getUser();
    this.route.params
      .switchMap((params: Params) => this.shopService.getShop(+params['shop_id']))
      .subscribe(shop => {
        this.shop = shop;
        if (this.shop.seller != this.user.id) {
          this.router.navigate(['/404/']);
        }
      });
    this.myForm = this.fb.group({
      'name' : ['', [
          Validators.required,
        ]
      ],
    });

    this.myForm.valueChanges
      .subscribe(data => this._checkErrors(this.myForm, data));
  }

  private _checkErrors(form: FormGroup, data?: any) {
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  submitForm(formValue: any): void {
    this.loading = true;
    formValue['shop'] = this.shop.id;
    this.productService.create(formValue)
      .subscribe(
        data => {
          this.alertService.success("Product is added successfully", true);
          this.router.navigate(['/shop', this.shop.id]);
        },
        error => {
          let errors = error.json().errors;
          for (const field in errors) {
            this.formErrors[field] = errors[field][0];
          }
          this.loading = false;
        });
  }

  formErrors = {
    'name': '',
  };
  validationMessages = {
    'name': {
      'required':  'Product name is required.',
    },
  };
}
