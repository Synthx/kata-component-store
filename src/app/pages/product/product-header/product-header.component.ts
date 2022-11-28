import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ProductComponentStore } from '../product.component.store';
import { FormBuilder, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@UntilDestroy()
@Component({
    selector: 'app-product-header',
    templateUrl: './product-header.component.html',
    styleUrls: ['./product-header.component.scss'],
})
export class ProductHeaderComponent implements OnInit {
    readonly keywordControl: FormControl;

    constructor(private readonly store: ProductComponentStore, private readonly formBuilder: FormBuilder) {
        this.keywordControl = this.formBuilder.control(null);
    }

    ngOnInit(): void {
        this.keywordControl.valueChanges
            .pipe(debounceTime(350), distinctUntilChanged(), untilDestroyed(this))
            .subscribe(keyword => {
                console.warn(keyword);
            });
    }

    toggleFavoriteProducts(): void {
        this.store.toggleFavoriteProducts();
    }
}
