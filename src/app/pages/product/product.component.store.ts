import { ComponentStore } from '@ngrx/component-store';
import { productComponentInitialState, ProductComponentState } from './product.component.state';
import { Injectable } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { WatchComponentState } from '../../core/store';

@Injectable()
@WatchComponentState()
export class ProductComponentStore extends ComponentStore<ProductComponentState> {
    constructor(private readonly productService: ProductService) {
        super(productComponentInitialState);
    }

    // SELECTORS

    // UPDATERS

    // EFFECTS
}
