import { Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ProductComponentStore } from '../product.component.store';
import { Observable } from 'rxjs';

@UntilDestroy()
@Component({
    selector: 'app-product-footer',
    templateUrl: './product-footer.component.html',
    styleUrls: ['./product-footer.component.scss'],
})
export class ProductFooterComponent {
    remainingProducts$: Observable<number>;

    constructor(private readonly store: ProductComponentStore) {
        this.remainingProducts$ = this.store.remainingProducts$.pipe(untilDestroyed(this));
    }

    loadMore(): void {
        this.store.loadMoreProducts();
    }
}
