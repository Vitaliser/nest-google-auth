/*
 * @Copyright ParanoiA
 * @Created: 12/19/20, 1:21 PM
 * @Date : 2020.
 * @author : M.ALi Kheiry
 *
 *     /\_/\
 *   =( °w° )=       Meow
 *     )   (  //
 *    (__ __)//
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = process.env.PORT;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(port);
}

bootstrap();
