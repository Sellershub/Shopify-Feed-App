import { Injectable } from '@nestjs/common';
import * as Shopify from 'shopify-api-node';

@Injectable()
export class ShopifyService {
  private shopify: Shopify;

  constructor() {
    this.shopify = new Shopify({
      shopName: process.env.SHOPIFY_SHOP_NAME,
      accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
    });
  }

  async initShopify() {
    this.shopify = new Shopify({
      shopName: process.env.SHOPIFY_SHOP_NAME,
      accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
    });
    try {
      return (await this.shopify.shop.get()).id;
    } catch (error) {
      console.log(error);
    }
  }

  public async getProducts(): Promise<
    Shopify.IPaginatedResult<Shopify.IProduct> | any
  > {
    
    const products = await this.shopify.product.list();
    console.log('products', products)
  }

  public async updateThemeAsset(
    themeId: number,
    key: string,
    jsonBlock: any,
  ): Promise<any> {
    const asset = await this.shopify.theme
      .update(themeId, {
        key,
        value: JSON.stringify(jsonBlock),
      })
      .then((res) => {
        console.log('res', res);
      })
      .catch((err) => {
        console.log('err', err);
      });



    return asset;
  }
}
