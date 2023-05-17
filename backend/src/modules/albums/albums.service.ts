import { Body, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { FirebaseAlbumService } from '../firebase/services/firebase-album.service';
import { FirebaseWidgetService } from '../firebase/services/firebase-widget.service';
import { FirebaseService } from '../firebase/services/firebase.service';
import { CreateAlbumDto } from '../instagram/dtos/create-album.dto';
import { CreateWidgetDto } from './dtos/create-widget.dto';
import { DeleteAlbumDto } from './dtos/delete-album.dto';
import { GetAlbumByIdDto } from './dtos/get-album-by-id.dto';
import { GetUserAlbumsDto } from './dtos/get-user-albums.dto';
import { GetWidgetDto } from './dtos/get-widget.dto';
import { PatchAlbumDataDto } from './dtos/patch-album-data.dto';

@Injectable()
export class AlbumsService {
  constructor(private readonly firebaseAlbum: FirebaseAlbumService) {}
  public async createAlbum(createAlbumDto: CreateAlbumDto) {
    const albumId = randomUUID();
    return await this.firebaseAlbum.createAlbum(createAlbumDto, albumId);
  }

  public async pathcAlbumData(patchAlbumDataDto: PatchAlbumDataDto) {
    return await this.firebaseAlbum.patchAlbumData(patchAlbumDataDto);
  }

  public async getUsersAlbums(getUserAlbumsDto: GetUserAlbumsDto) {
    const userAlbums = await this.firebaseAlbum.getUserAlbums(
      getUserAlbumsDto.userId,
    );

    const res = userAlbums.map((album) => {
      const albumData: Record<string, any> = {};
      albumData.albumName = album.albumName;
      albumData.totalAmount = album.posts.length;
      albumData.albumId = album.albumId;
      
      for (const postType of album.posts) {
        const lowerCased = postType.toLowerCase();

        albumData[lowerCased]
          ? albumData[lowerCased]++
          : (albumData[lowerCased] = 1);
      }
      return albumData;
    });

    return res;
  }

  public async getAlbumById(getAlbumByIdDto: GetAlbumByIdDto) {
    return await this.firebaseAlbum.getAlbumById({
      albumId: getAlbumByIdDto.albumId,
      userId: getAlbumByIdDto.userId,
    });
  }

  public async deleteAlbum(deleteAlbumDto: DeleteAlbumDto) {
    try {
      return await this.firebaseAlbum.deleteAlbum(
        deleteAlbumDto.userId,
        deleteAlbumDto.albumId,
      );
    } catch (error) {
      throw error;
    }
  }

  public async deleteAlbumWithWidgets(deleteAlbumDto: DeleteAlbumDto) {
    try {
      return await this.firebaseAlbum.deleteAlbumWithWidgets(deleteAlbumDto);
    } catch (error) {
      throw error;
    }
  }
}
