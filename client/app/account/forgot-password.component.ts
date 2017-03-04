import { Component, OnInit, ViewChild} 			from '@angular/core';
import { FormBuilder, FormGroup, Validators } 	from '@angular/forms';
import { Router, ActivatedRoute }				from '@angular/router';
import { AuthenticationService, AlertService }	from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'forgot-password.component.html',
})
export class ForgotPasswordComponent {
	forgotPasswordForm: FormGroup;
	loading = false;

    constructor(
        private router: Router,
        private alertService: AlertService,
        private authenticationService: AuthenticationService,
        private fb: FormBuilder) {}
 
    ngOnInit() {
    	let emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
    	this.forgotPasswordForm = this.fb.group({
			'email' : ['', [
					Validators.required,
					Validators.pattern(emailRegex),
				]
			],
		});

		this.forgotPasswordForm.valueChanges
			.subscribe(data => this._onValueChanged(this.forgotPasswordForm, data));
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

    submitForm(forgotFormValue: any): void {
		this.loading = true;
		this.authenticationService.forgotPassword(
			forgotFormValue.email)
		.subscribe(
	          data => {
	            this.alertService.success("An password reset link has been sent to " + forgotFormValue.email, true);
	           	this.loading = false;
	           	this.router.navigate(['/'])
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
	  'email': '',
	};

	validationMessages = {
	  'email': {
	    'required':	'Email is required.',
	    'pattern': 'This is not a valid email address',
	  },
	};
}

