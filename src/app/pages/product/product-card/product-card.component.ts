import { Component, Input, OnInit } from '@angular/core';
import { ProductComponentStore } from '../product.component.store';
import { Product } from '../../../model/product';
import { Observable, of } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
    @Input() product!: Product;

    isFavorite$: Observable<boolean> = of(false);

    constructor(private readonly store: ProductComponentStore) {}

    ngOnInit(): void {
        this.isFavorite$ = this.store.isFavorite$(this.product).pipe(untilDestroyed(this));
    }

    toggleFavorite(): void {
        this.store.toggleFavorite(this.product);
    }
}
