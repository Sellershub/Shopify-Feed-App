import { Module } from '@nestjs/common';
import { FirebaseModule } from '../firebase/firebase.module';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';

@Module({
  imports: [FirebaseModule],
  controllers: [AlbumsController],
  providers: [AlbumsService],
})
export class AlbumsModule {}
