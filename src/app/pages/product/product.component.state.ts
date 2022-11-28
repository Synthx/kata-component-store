import { initialPageableState, Pageable } from 'src/app/model/pageable';
import { Product } from '../../model/product';

export interface ProductComponentState {
    products: Pageable<Product>;
    favoriteProducts: Product[];
    showOnlyFavorites: boolean;
}

export const productComponentInitialState: ProductComponentState = {
    products: initialPageableState(),
    favoriteProducts: [],
    showOnlyFavorites: false,
};
