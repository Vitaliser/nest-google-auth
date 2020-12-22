import { Product } from './entity/product.entity';
import { PRODUCT_REPOSITORY } from '../constants';

export const productProviders = [
    {
        provide: PRODUCT_REPOSITORY,
        useValue: Product,
    },
];