import { Component, OnInit, ViewChild} 			from '@angular/core';
import { Router, ActivatedRoute }				from '@angular/router';
import { FormBuilder, FormGroup, Validators } 	from '@angular/forms';
import { AuthenticationService, AlertService, User}	from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'change-password.component.html',
})
export class ChangePasswordComponent {
	changePasswordForm: FormGroup;
	loading = false;
	user:User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private fb: FormBuilder) {}
 
    ngOnInit() {
    	this.user = this.authenticationService.getUser();
    	this.changePasswordForm = this.fb.group({
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
				'old_password': ['',[
						Validators.required, 
						Validators.minLength(5),
						Validators.maxLength(20),
						
					]
			]}, {
				validator: this.validate(),
			}
		);

		this.changePasswordForm.valueChanges
			.subscribe(data => this._onValueChanged(this.changePasswordForm, data));
    }

	private validate() {
	  return (group: FormGroup) => {
	    let c_old = group.controls['old_password'];
	    let c_new = group.controls['new_password'];
	    let c_new2 = group.controls['new_password2'];

	   	if (c_old.value == c_new.value) {
	      return c_new.setErrors({'same_new_password': true})
	    }
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

    submitForm(passwordFormValue: any): void {
    	if (passwordFormValue.old_password && passwordFormValue.new_password) {
    		this.loading = true;
    		this.authenticationService.changePassword(
    			this.user.id,
    			passwordFormValue.old_password,
    			passwordFormValue.new_password)
    		.subscribe(
		          data => {
		            this.alertService.success("Password is changed successfully", true);
		           	this.loading = false;
		           	this.router.navigate(['profile'])
		          },
		          error => {
		           	this.loading = false;
		           	let errors = error.json().errors;
	              	for (const field in errors) {
				   	 this.formErrors[field] = errors[field][0];
				  	}
          	});
    	}
    }

    formErrors = {
	  'new_password': '',
	  'new_password2': '',
	  'old_password': '',
	};

	validationMessages = {
	  'old_password': {
	    'required':	'Old password is required.',
	  	'minlength': 'Password must be at least 5 characters long.',
    	'maxlength': 'Password cannot be more than 20 characters long.',
	  },
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

