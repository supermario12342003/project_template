import { Component, OnInit, ViewChild} 			from '@angular/core';
import { FormBuilder, FormGroup, Validators } 	from '@angular/forms';
import { Router, ActivatedRoute }				from '@angular/router';
import { AuthenticationService, AlertService }	from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'reset-password.component.html',
})
export class ResetPasswordComponent {
	myForm: FormGroup;
	reset_token:string;
	email:string;
	loading = false;

    constructor(
    	private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
        private authenticationService: AuthenticationService,
        private fb: FormBuilder) {}
 
    ngOnInit() {
    	let emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
    	this.reset_token = this.route.snapshot.queryParams['token']
    	this.email = this.route.snapshot.queryParams['email']
    	console.log("here");
    	if (!this.reset_token || !this.email) {
	        this.router.navigate(['/404/'])
    	}
    	this.myForm = this.fb.group({
				'new_password': ['',[
						Validators.required, 
						Validators.minLength(5),
						Validators.maxLength(20),
						
					]
				],
				'new_password2': ['',[
						Validators.required, 
						Validators.minLength(5),
						Validators.maxLength(20),
						
					],
				],
			},{
				validator: this.validate(),
			});

		this.myForm.valueChanges
			.subscribe(data => this._onValueChanged(this.myForm, data));
    }

	private validate() {
	  return (group: FormGroup) => {
	    let c_new = group.controls['new_password'];
	    let c_new2 = group.controls['new_password2'];

	    if (c_new.value !== c_new2.value) {
	      return c_new2.setErrors({'missmatched_password': true})
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

    submitForm(myForm: any): void {
		this.loading = true;
		this.authenticationService.resetPassword(
			this.email, this.reset_token, myForm.new_password)
		.subscribe(
	          data => {
	            this.alertService.success("Your password has been changed successfully", true);
	           	this.loading = false;
	           	this.router.navigate(['/profile/login'])
	          },
	          error => {
	           	this.loading = false;
	           	let errors = error.json().errors;
              	for (const field in errors) {
			   	 this.formErrors[field] = errors[field][0];
			  	}
      	});
    }

    formErrors = {
	  'new_password': '',
	  'new_password2': '',
	};

	validationMessages = {
	  'new_password': {
	    'required':	'New password is required.',
		'minlength': 'Password must be at least 5 characters long.',
    	'maxlength': 'Password cannot be more than 20 characters long.',
    	'same_new_password': 'New password cannot be the same as the old one.',
	  },
	  'new_password2': {
	    'required':	'Confirmation of the new password is required.',
		'minlength': 'Password must be at least 5 characters long.',
    	'maxlength': 'Password cannot be more than 20 characters long.',
    	'missmatched_password': 'Passwords are not the same.',
	  }
	};
}

