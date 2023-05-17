import { Module } from '@nestjs/common';
import { ShopifyService } from './shopify.service';
import { ConfigModule } from '@nestjs/config';
import { ShopifyController } from './shopify.controller';
import { HttpModule } from '@nestjs/axios';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  imports: [ConfigModule, HttpModule, FirebaseModule],
  controllers: [ShopifyController],
  providers: [ShopifyService],
  exports: [ShopifyService],
})
export class ShopifyModule {}
