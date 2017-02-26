import { Component }        from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { Router }				from '@angular/router';


@Component({
    moduleId: module.id,
    templateUrl: 'landing.component.html',
})
export class LandingComponent {

	constructor(
		private cookieService:CookieService,
		private router:Router,
	){}
	setLanguage(language:string) {
		if (language == 'fr' || language == 'en') {
    		this.cookieService.put('language', language);
    		window.location.reload(false); 
		}
	}
}
