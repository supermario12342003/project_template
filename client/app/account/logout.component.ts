import { Component }        from '@angular/core';
import { AuthenticationService }	from '../_services/index';
import { Router }				from '@angular/router';


@Component({
    moduleId: module.id,
    template: `
        Logging out
    `,
})
export class LogoutComponent {

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
	) {}

	ngOnInit() {
		this.authenticationService.logout();
		this.router.navigate(['/']);
	}
}
