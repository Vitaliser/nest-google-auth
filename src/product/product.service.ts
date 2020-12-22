import { Injectable, Inject } from '@nestjs/common';
import { PRODUCT_REPOSITORY } from '../constants';
import { Product } from './entity/product.entity';
import { createProductDto } from './dto/createProduct.dto';

@Injectable()
export class ProductService {
    constructor(
        @Inject(PRODUCT_REPOSITORY) private readonly productRepository: typeof Product,
    ) {
    }

    async getAllProducts(): Promise<Product[]> {
        return this.productRepository.findAll<Product>();
    }

    async createProduct(createProduct: createProductDto): Promise<Product> {
        return await this.productRepository.create<Product>(createProduct);
    }
}