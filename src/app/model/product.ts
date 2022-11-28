import { Picture } from './picture';

export interface Product {
    id: number;
    label: string;
    price: number;
    pictures: Picture[];
}
