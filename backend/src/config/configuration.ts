import { IConfig } from './interfaces/config.interface';

export default () =>
  ({
    port: parseInt(process.env.PORT, 10) || 8080,
    db: {
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +(process.env.DATABASE_PORT || 5432),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
    },
    shopify: {
      api_key: process.env.SHOPIFY_API_KEY,
      api_secret_key: process.env.SHOPIFY_API_SECRET_KEY,
      shop_name: process.env.SHOPIFY_SHOP_NAME,
      shop_password: process.env.SHOPIFY_SHOP_PASSWORD,
    },
  } as IConfig);
