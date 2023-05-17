import { Module } from '@nestjs/common';
import { FirebaseModule } from '../firebase/firebase.module';
import { InstagramModule } from '../instagram/instagram.module';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [InstagramModule, FirebaseModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
