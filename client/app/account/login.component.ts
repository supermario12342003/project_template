import { Component, OnInit, ViewChild} 			from '@angular/core';
import { Router, ActivatedRoute }				from '@angular/router';
import { FormBuilder, FormGroup, Validators } 	from '@angular/forms';
import { AuthenticationService, AlertService }	from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html',
})
export class LoginComponent {
	myForm: FormGroup;
	loading = false;
	returnUrl: string;
	formErrors = {
	  'email': '',
	  'password': ''
	};
	validationMessages = {
	  'email': {
	    'required':	'Email is required.',
	    'pattern': 'This is not a valid email address',
	  },
	  'password': {
	    'required':  'Password is required.',
		'minlength': 'Password must be at least 5 characters long.',
    	'maxlength': 'Password cannot be more than 20 characters long.',
	  }
	};
		


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private fb: FormBuilder) {}
 
    ngOnInit() {
    	let emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
    	this.myForm = this.fb.group({
				'email' : ['', [
						Validators.required,
						Validators.pattern(emailRegex),
					]
				],
				'password': ['',[
						Validators.required, 
						Validators.minLength(5),
						Validators.maxLength(20)
					]
				],
				'remember' : true
			})

			this.myForm.valueChanges
				.subscribe(data => this.onValueChanged(data));
    	this.onValueChanged(); // (re)set validation messages now
      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/profile';
    }

    onValueChanged(data?: any) {
	    if (!this.myForm) { return; }
	    const form = this.myForm;
	    for (const field in this.formErrors) {
	      // clear previous error message (if any)
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

    submitForm(value: any): void {

      this.loading = true;
      this.authenticationService.login(value.email, value.password, value.remember)
        .subscribe(
          data => {
              console.log(data);
              this.router.navigate([this.returnUrl]);
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
