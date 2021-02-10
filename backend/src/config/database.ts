import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT ?? '5432'),
  database: process.env.POSTGRES_DATABASE,
  entities: ['dist/modules/**/infra/typeorm/entities/*.entity.{ts,js}'],
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  migrations: ['./dist/database/migrations/*.ts'],
  cli: {
    migrationsDir: './dist/database/migrations',
  },
  // logging: true,
  // synchronize: true,
};

export default config;
