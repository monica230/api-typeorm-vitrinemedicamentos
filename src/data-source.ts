import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'adimin',
    database: 'vitrine-medicamentos',
    synchronize: true,
    logging: false,
    entities: ['src/entities/.ts*'],
    migrations: ['src/database/migration/.ts*'],
    subscribers: ['src/database/subscribers/.ts'],
});
