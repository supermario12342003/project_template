import { Component }        from '@angular/core';
import { AuthenticationService, AlertService}	from '../_services/index';
import { User }									from '../_models/user.model';


@Component({
    moduleId: module.id,
    templateUrl: 'profile.component.html',
})
export class ProfileComponent {

	user:User;

    constructor(
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
	) {}

	ngOnInit() {
		this.authenticationService.me()
	        .subscribe(
	          user => {
	          	this.user = user as User;
	          	console.log(this.user);
	          },
	          error => {
	              this.alertService.error(error);
	          });
	}

}
