import { Component, NgZone }       		from '@angular/core';
import { AlertService }			from '../_services/alert.service';
import {  ShopService }  from '../_services/shop.service';
import {  AuthenticationService }	from '../_services/authentication.service';
import { Shop, Category, } from '../_models/shop.model';
import { Router, ActivatedRoute }        from '@angular/router';
import { FormBuilder, FormGroup, Validators }   from '@angular/forms';
import { GoogleplaceDirective }          from '../_directives/googleplace.directive'
import { HighlightDirective }          from '../_directives/highlight.directive'
import { Address, Marker, Position }   from '../_models/address.model'
import { User }                  from '../_models/user.model';


@Component({
    moduleId: module.id,
    templateUrl: 'add.component.html',
})
export class AddComponent {

  myForm: FormGroup;
  categories: Category[];
  loading = false;
  address: Address;
  markers: Marker[] = [];
  center: Position;
  user: User;

    constructor(
        private shopService: ShopService,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private fb: FormBuilder,
        private router: Router,
        private zone:NgZone,

	) {}

  ngOnInit() {
    this.user = this.authenticationService.getUser();
    this.shopService.getCategories()
    .subscribe(
      data => {
        this.categories = data;
    });
    this.myForm = this.fb.group({
      'name' : ['', [
          Validators.required,
        ]
      ],
      'address' : ['', [
          Validators.required,
        ]
      ],
      'lat' : ['', [
          Validators.required,
        ]
      ],
      'lng' : ['', [
          Validators.required,
        ]
      ],
      'category': ['', [
          Validators.required,
        ]
      ]
    });

    this.myForm.get('address').valueChanges
      .subscribe(data => this._validateAddress(this.myForm, data));

    this.myForm.valueChanges
      .subscribe(data => this._checkErrors(this.myForm, data));
  }

  private _validateAddress(form:FormGroup, data?: any) {
    let add_ctrl = form.get('address');
    //if address is changed, then reset gps value
    if (this.address && add_ctrl.value != this.address.formatted_address) {
      this.myForm.patchValue({
        lng: null,
        lat: null,
      });
    }
    if (add_ctrl && add_ctrl.dirty && !form.get('lng').value) {
      add_ctrl.setErrors({'addressNotSelected': true});
    }
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

  getAddress(address:Address) {  
    this.zone.run(() => {
      this._selectAddress(address);
    });
    this.center = address.pos;
  }

  private _selectAddress(address:Address) {
    this.address = address;
    this.markers = [];
    var marker = new Marker(address.pos, ()=> {
      console.log(this.address);
    });
    this.markers.push(marker);
    this.myForm.patchValue({
      address: address.formatted_address,
      lng: address.pos.lng,
      lat: address.pos.lat,
    });
    this.myForm.get('address').setErrors(null);
    this.formErrors['address'] = '';
  }

  submitForm(formValue: any): void {
    this.loading = true;
    formValue['seller'] = this.user.id;
    this.shopService.create(formValue)
      .subscribe(
        data => {
          this.alertService.success("Shop is added successfully", true);
          this.router.navigate(['/product/shop/list']);
        },
        error => {
          let errors = error.json().errors;
          for (const field in errors) {
            this.formErrors[field] = errors[field][0];
          }
          this.loading = false;
        });
  }

  onClick(address:Address) {
    this.zone.run(() => {
      this._selectAddress(address);
    });
  }

  formErrors = {
    'name': '',
    'address': '',
    'category': '',
  };
  validationMessages = {
    'name': {
      'required':  'Shop name is required.',
    },
    'address': {
      'required':  'Address is required.',
      'addressNotSelected':  'Please select an address from the suggestion or the map',
    },
    'category': {
      'required':  'Category is required.',
    },
  };
}
