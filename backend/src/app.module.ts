// import { HelperModule } from '@/helper/helper.module';
import { ShopifyAuthModule } from '@nestjs-hybrid-auth/shopify';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from '~/config/configuration';
import { FirebaseModule } from './modules/firebase/firebase.module';
import { ShopifyModule } from './modules/shopify/shopify.module';
import { InstagramModule } from './modules/instagram/instagram.module';
import { PostsModule } from './modules/posts/posts.module';
import { AlbumsModule } from './modules/albums/albums.module';
import { WidgetModule } from './modules/widget/widget.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [configuration],
    }),
    ShopifyAuthModule.forRoot({
      clientID: process.env.SHOPIFY_API_KEY,
      clientSecret: process.env.SHOPIFY_API_SECRET_KEY,
      callbackURL: process.env.SHOPIFY_CALLBACK_URL, //
      scope: ['read_themes', 'write_themes'],
      shop: process.env.SHOPIFY_SHOP_NAME,
    }),
    ShopifyModule,
    FirebaseModule,
    InstagramModule,
    PostsModule,
    AlbumsModule,
    WidgetModule,
  ],
})
export class AppModule {}
