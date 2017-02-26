import { Component, OnInit, ViewChild} 			from '@angular/core';
import { Router, ActivatedRoute }				from '@angular/router';
import { FormBuilder, FormGroup, Validators } 	from '@angular/forms';
import { AuthenticationService, AlertService }	from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html',
})
export class RegisterComponent {
	myForm: FormGroup;
	passwordForm: FormGroup;
	loading = false;
	returnUrl: string;
	formErrors = {
	  'email': '',
	  'password': '',
	  'password2': '',
	  'phone': '',
	};
	validationMessages = {
	  'email': {
	    'required':	'Email is required.',
	    'pattern': 'This is not a valid email address',
	  },
	  'phone': {
	    'pattern': 'Phone should at least 10 digits including country code, eg 3301234567',
	  },
	  'password': {
	    'required':  'Password is required.',
		'minlength': 'Password must be at least 5 characters long.',
    	'maxlength': 'Password cannot be more than 20 characters long.',
	  },
	  'password2': {
	    'required':  'Password is required.',
		'minlength': 'Password must be at least 5 characters long.',
    	'maxlength': 'Password cannot be more than 20 characters long.',
    	'missmatchedPasswords': 'Passwords are not the same.',
	  },
	};

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private fb: FormBuilder) {}
 
    ngOnInit() {
    	let emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
    	let phoneRegex = '^\\+?\\d{10,14}$';
    	this.passwordForm = this.fb.group({
				'password': ['',[
						Validators.required, 
						Validators.minLength(5),
						Validators.maxLength(20)
					]
				],
				'password2': ['',[
						Validators.required, 
						Validators.minLength(5),
						Validators.maxLength(20),
						
					]
			]}, {
				validator: this._matchingPasswords('password', 'password2')
			}
		);
    	this.myForm = this.fb.group({
			'email' : ['', [
					Validators.required,
					Validators.pattern(emailRegex),
				]
			],
			'phone' : ['', [
					Validators.pattern(phoneRegex),
				]
			],
		});

		this.myForm.valueChanges
			.subscribe(data => this._onValueChanged(this.myForm, data));
		this.passwordForm.valueChanges
			.subscribe(data => this._onValueChanged(this.passwordForm, data));
      	// get return url from route parameters or default to '/'
      	this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/profile';
    }

	private _matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
	  return (group: FormGroup) => {
	    let passwordInput = group.controls[passwordKey];
	    let passwordConfirmationInput = group.controls[passwordConfirmationKey];
	    if (passwordInput.value !== passwordConfirmationInput.value) {
	      return passwordConfirmationInput.setErrors({missmatchedPasswords: true})
	    }
	  }
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

    submitForm(formValue: any, passwordFormValue: any): void {
      this.loading = true;
      this.authenticationService.register(formValue.email, passwordFormValue.password, formValue.phone)
        .subscribe(
          data => {
              this.router.navigate([this.returnUrl]);
          },
          error => {
          	let errors = error.json().errors;
              for (const field in errors) {
			    this.formErrors[field] = errors[field][0];
			  }
              this.loading = false;
          });
    }
}
