import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { DatabaseModule } from '../database/database.module';
import { productProviders } from './product.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [ProductController],
    providers: [ProductService, ... productProviders],
})

export class ProductModule {
}