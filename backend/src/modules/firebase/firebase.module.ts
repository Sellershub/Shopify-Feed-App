import { Module } from '@nestjs/common';
import { FirebaseAlbumService } from './services/firebase-album.service';
import { FirebaseInstagramService } from './services/firebase-insagran.service';
import { FirebasePostsService } from './services/firebase-posts.service';
import { FirebaseWidgetService } from './services/firebase-widget.service';
import { FirebaseService } from './services/firebase.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    FirebaseService,
    FirebaseAlbumService,
    FirebasePostsService,
    FirebaseWidgetService,
    FirebaseInstagramService,
  ],
  exports: [
    FirebaseAlbumService,
    FirebasePostsService,
    FirebaseWidgetService,
    FirebaseInstagramService,
  ],
})
export class FirebaseModule {}
