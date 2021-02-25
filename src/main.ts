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
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as fs from "fs";
import { HttpExceptionFilter } from "./filters/exception/httpExceptionHandler";

const port = Number(process.env.PORT) || 3000;
const hostname = process.env.HOSTNAME || 'localhost';
const ssl = process.env.SSL === 'true';
let httpsOptions = null;

if (ssl) {
    const keyPath = process.env.SSL_KEY_PATH || '';
    const certPath = process.env.SSL_CERT_PATH || '';
    httpsOptions = {
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(certPath),
    };
}

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {httpsOptions, logger: true});
    app.set("json spaces", 2);
    app.set("trust proxy", true);
    app.disable("x-powered-by");
    app.useGlobalFilters(new HttpExceptionFilter());
    await app.listen(port, hostname, () => {
            const address = 'http' + (ssl ? 's' : '') + '://' + hostname + ':' + port + '/';
        }
    )
}

bootstrap().then(r => console.log("done"));
