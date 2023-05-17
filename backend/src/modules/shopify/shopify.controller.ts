import { ShopifyAuthResult, UseShopifyAuth } from '@nestjs-hybrid-auth/shopify';
import { Controller, Get, Req, Post } from '@nestjs/common';
import * as Shopify from 'shopify-api-node';
import { ShopifyService } from './shopify.service';

@Controller('shopify')
export class ShopifyController {
  constructor(private shopifyService: ShopifyService) {}

  @UseShopifyAuth()
  @Get('auth')
  loginWithShopify() {
    //return 'test-bin-f'
    return this.shopifyService.initShopify();
  }

  @UseShopifyAuth()
  @Get('auth/callback')
  async shopifyCallback(@Req() req): Promise<Partial<ShopifyAuthResult> | any> {
    try {
      const result: ShopifyAuthResult = req.hybridAuthResult;
      const shopify = new Shopify({
        shopName: process.env.SHOPIFY_SHOP_NAME,
        accessToken: result.accessToken,
      });

      return process.env.SHOPIFY_SHOP_NAME; // TODO: add dynamic shop name
    } catch (err) {
      console.log(err);
    }
  }

  @Get('/getproduct')
  public async getProducts() {
    return this.shopifyService.getProducts();
  }

  // @Post('/editTheme')
  // public async updateTheme(@Req() req): Promise<any> {
  //   console.log(req.body);
  //   return { response: req.body };
  // }

  @Post('/editTheme')
  public async updateTheme(@Req() req): Promise<any> {
    console.log(req.body);
    const { themeId, key, jsonBlock } = req.body;

    return this.shopifyService.updateThemeAsset(themeId, key, jsonBlock);
  }

  @Post('test')
  public async test(@Req() req) {
    console.log('req', req);
    console.log('req', req.body)
    return this.shopifyService.getProducts();
  }
}
