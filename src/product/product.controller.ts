import { Controller, Get, Post, Body, UseGuards, Res, HttpStatus } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './entity/product.entity';
import { AuthGuard } from "@nestjs/passport";
import { createProductDto } from "./dto/createProduct.dto";


@Controller('api')
export class ProductController {
    constructor(private readonly productService: ProductService) {
    }

    @Get("products")
    public async getProducts(): Promise<Product[]> {
        return this.productService.getAllProducts();
    }

    @Post("product")
    @UseGuards(AuthGuard('jwt'))
    public async createProduct(@Res() res, @Body()  createProduct: createProductDto): Promise<Product> {
        const newProduct = await this.productService.createProduct(createProduct);
        return res.status(HttpStatus.OK).json({
            message: 'Product has been submitted successfully!',
            post: newProduct,
        })
    }
}