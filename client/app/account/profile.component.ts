import { Component }        from '@angular/core';
import { AuthenticationService, AlertService, User}	from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'profile-nav.component.html',
})
export class ProfileNavComponent {
}

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
