import { Injectable }                    from '@angular/core';
import { Observable }                    from 'rxjs/Observable';
import { HttpService }                    from './http.service'
import { Headers, Response }              from '@angular/http';
import { Router }         from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { User }            from '../_models/user.model';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
    constructor(
        private http: HttpService,
        private router: Router,
    ) { }
    private _isAuthenticatedSource = new BehaviorSubject<boolean>(this.isAuthenticated());
    isAuthenticated$ = this._isAuthenticatedSource.asObservable();

    login(email: string, password: string, remember: boolean = true) {
        return this.http.post('/api/accounts/login/',
            JSON.stringify({ "email": email, "password": password }))
            .map((response: Response) => {
                let user = response.json();
                if (user && user.token) {
                    localStorage.removeItem('currentUser');
                    localStorage.removeItem('authToken');
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    localStorage.setItem('authToken', user.token);
                    this._isAuthenticatedSource.next(true);
                }
                return user;
            });
    }

    register(email: string, password: string, phone:string) {
        return this.http.post('/api/accounts/register/',
            JSON.stringify({ "email": email, "password": password, "phone": phone}))
            .map((response: Response) => {
                let user = response.json();
                if (user && user.token) {
                    localStorage.removeItem('currentUser');
                    localStorage.removeItem('authToken');
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    localStorage.setItem('authToken', user.token);
                    this._isAuthenticatedSource.next(true);
                }
                return user;
            });
    }

    getUser(): User {
        if (this.isAuthenticated) {
            let currentUserStr = localStorage.getItem('currentUser');
            if (currentUserStr) {
                return (JSON.parse(currentUserStr) as User)
            }
        }
    }

    me() {
        return this.http.get('/api/accounts/me/', {})
            .map((response: Response) => {
                let user = response.json();
                if (user) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                else {
                    localStorage.removeItem('currentUser');
                    localStorage.removeItem('authToken');
                    this._isAuthenticatedSource.next(false);
                }
                return user;
            });
    }

    put(user:User) {
        return this.http.put('/api/accounts/' + user.id + '/',
            JSON.stringify(user))
            .map((response: Response) => {
                let user = response.json();
                localStorage.setItem('currentUser', JSON.stringify(user));
                return user;
            });
    }

    changePassword(user_id:number, old_password:string, new_password:string) {
        return this.http.post('api/accounts/' + user_id + '/changepassword/', 
            JSON.stringify({old_password: old_password, new_password: new_password}));
    }

    forgotPassword(email:string) {
        return this.http.post('api/accounts/forgotpassword/', 
            JSON.stringify({email: email}));
    }

    resetPassword(email:string, reset_token:string, new_password:string) {
        return this.http.post('api/accounts/resetpassword/', 
            JSON.stringify({email: email, reset_token: reset_token, new_password: new_password}));
    }

    isAuthenticated():boolean {
        return (localStorage.getItem('authToken') != null);
    }

    logout(returnUrl:string="/") {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('authToken');
        this._isAuthenticatedSource.next(false);
    }
}