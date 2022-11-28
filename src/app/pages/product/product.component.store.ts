import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { productComponentInitialState, ProductComponentState } from './product.component.state';
import { Injectable } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { WatchComponentState } from '../../core/store';
import { switchMap, tap, withLatestFrom } from 'rxjs';
import { Product } from '../../model/product';

@Injectable()
@WatchComponentState()
export class ProductComponentStore extends ComponentStore<ProductComponentState> {
    constructor(private readonly productService: ProductService) {
        super(productComponentInitialState);
    }

    // SELECTORS

    // PRODUCTS
    readonly loading$ = this.select(state => state.products.loading);
    readonly products$ = this.select(state => state.products.content);
    readonly totalProducts$ = this.select(state => state.products.total);
    readonly remainingProducts$ = this.select(
        this.products$,
        this.totalProducts$,
        (products, total) => total - products.length,
    );

    // FAVORITES
    readonly showFavoriteProducts$ = this.select(state => state.showOnlyFavorites);
    readonly favoriteProducts$ = this.select(state => state.favoriteProducts);
    readonly isFavorite$ = (product: Product) =>
        this.select(state => state.favoriteProducts.findIndex(p => p.id === product.id) !== -1);

    // OTHER
    private readonly page$ = this.select(state => state.products.page);

    // UPDATERS
    readonly toggleFavoriteProducts = this.updater(state => ({
        ...state,
        showOnlyFavorites: !state.showOnlyFavorites,
    }));
    readonly toggleFavorite = this.updater((state, product: Product) => {
        let favoriteProducts = state.favoriteProducts;
        if (state.favoriteProducts.findIndex(p => p.id === product.id) !== -1) {
            favoriteProducts = favoriteProducts.filter(p => p.id !== product.id);
        } else {
            favoriteProducts = [...favoriteProducts, product];
        }

        return {
            ...state,
            favoriteProducts,
        };
    });

    // EFFECTS
    readonly loadProducts = this.effect(action$ => {
        return action$.pipe(
            tap(() =>
                this.patchState(state => ({ products: { ...state.products, content: [], page: 0, loading: true } })),
            ),
            switchMap(() =>
                this.productService.findAll(0).pipe(
                    tapResponse(
                        page =>
                            this.patchState(state => ({
                                products: {
                                    ...state.products,
                                    total: page.totalElements,
                                    content: page.content,
                                    loading: false,
                                },
                            })),
                        () => this.patchState(state => ({ products: { ...state.products, loading: false } })),
                    ),
                ),
            ),
        );
    });

    readonly loadMoreProducts = this.effect(action$ => {
        return action$.pipe(
            tap(() => this.patchState(state => ({ products: { ...state.products, loading: true } }))),
            withLatestFrom(this.page$),
            switchMap(([_, index]) =>
                this.productService.findAll(index + 1).pipe(
                    tapResponse(
                        page =>
                            this.patchState(state => ({
                                products: {
                                    ...state.products,
                                    content: [...state.products.content, ...page.content],
                                    page: index + 1,
                                    loading: false,
                                },
                            })),
                        () => this.patchState(state => ({ products: { ...state.products, loading: false } })),
                    ),
                ),
            ),
        );
    });
}
