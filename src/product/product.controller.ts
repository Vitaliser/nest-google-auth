import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ProductService  } from './product.service';
import { Product } from './entity/product.entity';
import { AuthGuard } from "@nestjs/passport";

@Controller('user')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    public async getProducts(): Promise<Product[]> {
        return this.productService.getAllProducts();
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    public async createProduct(@Body() body): Promise<Product> {
        return this.productService.createProduct(body);
    }
}