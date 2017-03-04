import { Injectable }                    from '@angular/core';
import { HttpService }                    from './http.service'
import { Response }                      from '@angular/http';
import { Router }         from '@angular/router';
import { Shop }            from '../_models/shop.model';
import 'rxjs/add/operator/map';


@Injectable()
export class ShopService {
    constructor(
        private http: HttpService,
        private router: Router,
    ) { }

    create(shop:Shop) {
        return this.http.post('/api/shops/',
            JSON.stringify(shop))
            .map((response: Response) => {
                return response.json();
            });
    }


    list() {
        return this.http.get('/api/shops/')
            .map((response: Response) => {
                return response.json();
            });
    }

    myList(sellerId:number) {
        return this.http.get('/api/shops/' + sellerId + '/seller/')
            .map((response: Response) => {
                return response.json();
            });
    }

    getShop(id:number) {
        return this.http.get('/api/shops/' + id + '/')
            .map((response: Response) => {
                return response.json();
            });
    }

    getCategories() {
        return this.http.get('/api/shops/categories/')
            .map((response: Response) => {
                return response.json();
            });
    }
}