import { DataSource } from 'typeorm';
import { join } from 'path';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'subscription',
  username: 'postgres',
  password: '1234',
  entities: [join(__dirname + '/../**') + '/*.entity.{js,ts}'],
  migrations: [join(__dirname + '/../migrations') + '/*.{js,ts}'],
  migrationsRun: true,
});

export const DatabaseConfig = dataSource.options;
