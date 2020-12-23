import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from "@nestjs/config";
import { ProductModule } from './product/product.module';

@Module({
    imports: [
        AuthModule,
        ProductModule,
        DatabaseModule,
        ConfigModule.forRoot(
            {isGlobal: true})
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
