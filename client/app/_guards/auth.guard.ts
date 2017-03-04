import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../_services/index'

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authentication:AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        
        if (this.authentication.isAuthenticated()) 
            return true;

        // not logged in so redirect to login page with the return url
        this.router.navigate(['profile/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}