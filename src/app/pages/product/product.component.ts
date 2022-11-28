import { Component, OnInit } from '@angular/core';
import { ProductComponentStore } from './product.component.store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Product } from '../../model/product';
import { Observable, of } from 'rxjs';

@UntilDestroy()
@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    providers: [ProductComponentStore],
})
export class ProductComponent implements OnInit {
    readonly showFavoriteProducts$: Observable<boolean>;
    readonly favoriteProducts$: Observable<Product[]>;

    readonly products$: Observable<Product[]>;
    readonly totalProducts$: Observable<number>;
    readonly loading$: Observable<boolean>;

    constructor(private readonly store: ProductComponentStore) {
        this.showFavoriteProducts$ = this.store.showFavoriteProducts$.pipe(untilDestroyed(this));
        this.favoriteProducts$ = this.store.favoriteProducts$.pipe(untilDestroyed(this));

        this.products$ = this.store.products$.pipe(untilDestroyed(this));
        this.totalProducts$ = this.store.totalProducts$.pipe(untilDestroyed(this));
        this.loading$ = this.store.loading$.pipe(untilDestroyed(this));
    }

    ngOnInit(): void {
        this.store.loadProducts();
    }
}
