import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '../model/page';
import { Product } from '../model/product';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    constructor(private http: HttpClient) {}

    findAll(page: number, keyword?: string): Observable<Page<Product>> {
        let params = new HttpParams().set('page', page.toString()).set('size', '9');
        if (keyword) {
            params = params.set('sort', 'relevance,desc');
        } else {
            params = params.set('sort', 'creationDate,desc');
        }

        return this.http.post<Page<Product>>(
            'https://api.secondemain.kiabi.com/api/products/search',
            {
                keyword,
                category: { id: 9 },
                productsTypes: [{ id: 629 }],
                subCategory: { id: 148 },
            },
            {
                params,
            },
        );
    }
}
