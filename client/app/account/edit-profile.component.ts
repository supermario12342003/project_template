import { Component, OnInit, ViewChild} 			from '@angular/core';
import { Router, ActivatedRoute }				from '@angular/router';
import { FormBuilder, FormGroup, Validators } 	from '@angular/forms';
import { AuthenticationService, AlertService, User}	from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'edit-profile.component.html',
})
export class EditProfileComponent {
	myForm: FormGroup;
	loading = false;
	user: User;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private fb: FormBuilder) {}
 
    ngOnInit() {
    	this.user = this.authenticationService.getUser();
    	let phoneRegex = '^\\+?\\d{10,14}$';
    	this.myForm = this.fb.group({
			'phone' : [this.user.phone, [
					Validators.pattern(phoneRegex),
				]
			],
			'first_name' : [this.user.first_name, [
					Validators.minLength(2),
					Validators.maxLength(30),
				]
			],
			'last_name' : [this.user.last_name, [
					Validators.maxLength(30),
					Validators.minLength(2),
				]
			],

		});

		this.myForm.valueChanges
			.subscribe(data => this._onValueChanged(this.myForm, data));
    }

    private _onValueChanged(form: FormGroup, data?: any) {
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
    	this.user.phone = formValue.phone;
    	this.user.first_name = formValue.first_name;
    	this.user.last_name = formValue.last_name;
    	this.authenticationService.put(this.user)
    	 .subscribe(
          data => {
		      this.alertService.success("Profile is edited successfully");
		      this.loading = false;

          },
          error => {
           	this.loading = false;
          });
    }

    formErrors = {
	  'phone': '',
	  'first_name': '',
	  'last_name': '',
	};

	validationMessages = {
	  'phone': {
	    'pattern': 'Phone should at least 10 digits including country code, eg 3301234567',
	  },
	  'first_name': {
		'minlength': 'First name must be at least 2 characters long.',
    	'maxlength': 'First name cannot be more than 30 characters long.',
	  },
	  'last_name': {
		'minlength': 'Last name must be at least 2 characters long.',
    	'maxlength': 'Last name cannot be more than 30 characters long.',
	  },
	};
}

