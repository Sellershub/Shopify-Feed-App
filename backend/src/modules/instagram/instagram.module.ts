import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from '../firebase/firebase.module';
import { InstagramController } from './instagram.controller';
import { InstagramService } from './instagram.service';

@Module({
  imports: [ConfigModule, HttpModule, FirebaseModule],
  controllers: [InstagramController],
  providers: [InstagramService],
  exports: [InstagramService],
})
export class InstagramModule {}
