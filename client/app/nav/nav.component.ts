import { Component }        					from '@angular/core';
import { AuthenticationService }			from '../_services/index';
import { Subscription }							from 'rxjs/Subscription';
import { User }									from '../_models/user.model';


@Component({
    moduleId: module.id,
    selector: 'my-nav',
    templateUrl: 'nav.component.html',
    styleUrls: ['../css/nav.css',]
})
export class NavComponent {

	subscription:Subscription;
	isAuthenticated:boolean;
	user:User;
  constructor(
        private authentication: AuthenticationService,
	) {}

	ngOnInit() {
		this.subscription = this.authentication.isAuthenticated$.subscribe(
			item => this.isAuthenticated = item);
		this.isAuthenticated = this.authentication.isAuthenticated();
		if (this.isAuthenticated) {
			this.user = this.authentication.getUser();
		}
	}

	ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
  }

}