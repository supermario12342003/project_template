import { Injectable }                    from '@angular/core';
import { HttpService }                    from './http.service'
import { Response }                      from '@angular/http';
import { Router }         from '@angular/router';
import { Product }            from '../_models/product.model';
import 'rxjs/add/operator/map';


@Injectable()
export class ProductService {
    constructor(
        private http: HttpService,
        private router: Router,
    ) { }

    create(product:Product) {
        return this.http.post('/api/products/',
            JSON.stringify(product))
            .map((response: Response) => {
                return response.json();
            });
    }

    list() {
        return this.http.get('/api/products/')
            .map((response: Response) => {
                return response.json();
            });
    }

    myList(shopId:number) {
        return this.http.get('/api/products/' + shopId + '/shop/')
            .map((response: Response) => {
                return response.json();
            });
    }

    getProduct(id:number) {
        return this.http.get('/api/products/' + id + '/')
            .map((response: Response) => {
                return response.json();
            });
    }
}