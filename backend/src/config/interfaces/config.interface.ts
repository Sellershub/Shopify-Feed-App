export interface IConfig {
  port: number;
  db: {
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    entities: Array<string>;
    synchronize: boolean;
  };
  shopify: {
    api_key: string;
    api_secret_key: string;
    shop_name: string;
    shop_password: string;
  };
}
