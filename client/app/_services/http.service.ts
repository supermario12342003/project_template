import {Injectable} from '@angular/core';
import {Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs,
  Response, Headers, XSRFStrategy, CookieXSRFStrategy } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpService extends Http {

  constructor (backend: XHRBackend, options: RequestOptions) {

    super(backend, options);
    options.headers.set('Content-Type', 'application/json');
    this.authenticateHeaders(options.headers);
  }

  private authenticateHeaders(headers:Headers) {
    let token = localStorage.getItem('authToken');
    if (token)
        headers.set('Authorization', 'Token ' + token)
  }

  request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    if (typeof url === 'string') {
      if (!options) {
        options = {headers: new Headers()};
      }
      this.authenticateHeaders(options.headers);
    } else {
      this.authenticateHeaders(url.headers);
    }
    //return super.request(url, options).catch(this.catchAuthError(this));
    return super.request(url, options);
  }

  private catchAuthError (self: HttpService) {
    return (res: Response) => {
      if (res.status === 401 || res.status === 403) {
        // if not authenticated
        console.log(res);
      }
      return Observable.throw(res);
    };
  }
}

export function HttpServiceFactory(backend: XHRBackend, options: RequestOptions) {
  return new HttpService(backend, options);
}

export const HttpServiceProvider = {
  provide: HttpService,
  useFactory: HttpServiceFactory,
  deps: [XHRBackend, RequestOptions]
}


export const XSRFStrategyProvider = {
  provide: XSRFStrategy,
  useValue: new CookieXSRFStrategy('csrftoken', 'X-CSRFToken'),
}
