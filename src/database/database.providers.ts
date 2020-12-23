import { Sequelize } from "sequelize-typescript";
import { Product } from "../product/entity/product.entity";
import { databaseConfig } from "./config/database.config";
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';

export const databaseProviders = [{
    provide: 'SEQUELIZE',
    useFactory: async () => {
        let config;
        console.log(databaseConfig.development);
        switch (process.env.NODE_ENV) {
            case DEVELOPMENT:
                config = databaseConfig.development;
                break;
            case TEST:
                config = databaseConfig.test;
                break;
            case PRODUCTION:
                config = databaseConfig.production;
                break;
            default:
                config = databaseConfig.development;
        }
        const sequelize = new Sequelize(config);
        sequelize.addModels([Product]);
        await sequelize.sync();
        return sequelize;
    },
}];