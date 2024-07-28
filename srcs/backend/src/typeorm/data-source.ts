import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import 'module-alias/register';

export const datasource_config: DataSourceOptions = {
  type: 'postgres',
  host: 'database',
  port: 5432,
  username: 'postgres',
  password: '123456',
  database: 'cyberpong',
  synchronize: false,
  migrationsRun: false,
  logging: true,
  logger: 'file',
  entities: ['dist/typeorm/entities/*.js'],
  migrations: ['src/typeorm/migration/*{.ts,.js}'],
};

export const AppDataSource = new DataSource(datasource_config);
