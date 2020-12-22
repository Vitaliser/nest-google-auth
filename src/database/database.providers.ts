import { Sequelize } from "sequelize-typescript";
import { Product } from "../product/entity/product.entity";

export const databaseProviders = [{
    provide: 'SEQUELIZE',
    useFactory: async () => {
        const sequelize = new Sequelize(
            {
                dialect: 'postgres',
                host: 'suleiman.db.elephantsql.com',
                port: 5432,
                username: 'wenqcrge',
                password: 'lsTkJIGyF9auzqzrHhrHXEvHXMV4bos6',
                database: 'wenqcrge',
            }
        );
        sequelize.addModels([Product]);
        await sequelize.sync();
        return sequelize;
    },
}];