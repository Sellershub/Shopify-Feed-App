import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import * as admin from 'firebase-admin';
import { GetAlbumByIdDto } from '~/modules/albums/dtos/get-album-by-id.dto';
import { CreateAlbumDto } from '~/modules/instagram/dtos/create-album.dto';
import { FindUserAlbums } from '../types/findUserAlbums.type';
import { PatchAlbumDataDto } from '~/modules/albums/dtos/patch-album-data.dto';
import { PostAttributesDto } from '~/modules/posts/dtos/post-attributes.dto';
import { DeleteAlbumDto } from '~/modules/albums/dtos/delete-album.dto';

@Injectable()
export class FirebaseAlbumService extends FirebaseService {
  constructor() {
    super();
  }
  async getAlbumById({ albumId, userId }: GetAlbumByIdDto) {
    try {
      const resObj: Record<string, any> = {};
      const albumRef = this.db
        .collection('shops')
        .doc(userId)
        .collection('albums')
        .doc(albumId);
      const albumData = await albumRef.get();

      resObj.albumName = albumData.data()?.albumName;
      resObj.albumId = albumData.id;
      const posts = await albumRef.collection('posts').get();

      resObj.posts = await Promise.all(
        posts.docs.map(async (postDoc) => {
          const resObj: Record<string, any> = {};
          const { postRef, ...albumData }: admin.firestore.DocumentData =
            postDoc.data();
          const fullPostData = await postRef.get();
          Object.assign(resObj, fullPostData.data(), albumData);
          resObj.albumId = albumId;
          return resObj;
        }),
      );

      return resObj;
    } catch (error) {
      console.log(error);
    }
  }

  async getUserAlbums(userId: string) {
    const allAlbums = await this.db
      .collection('shops')
      .doc(userId)
      .collection('albums')
      .get();

    const res = [];
    allAlbums.forEach((album) => {
      res.push({ albumName: album.data().albumName, albumId: album.id });
    });
    for (const album of res) {
      const albumPosts = await this.db
        .collection('shops')
        .doc(userId)
        .collection('albums')
        .doc(album.albumId)
        .collection('posts')
        .get();
      album.posts = await Promise.all(
        albumPosts.docs.map(async (test) => {
          const { postRef, ...postData } = test.data();

          if (postData.isShown) {
            const postFullData = (await postRef.get()).data();

            if (postFullData) {
              return postFullData.media_type;
            }
          }
        }),
      );
      album.posts = album.posts.filter(Boolean);
    }

    return res as FindUserAlbums;
  }

  async deleteAlbum(userId: string, albumId: string) {
    const albumPath = this.database
      .collection('shops')
      .doc(userId)
      .collection('albums')
      .doc(albumId);

    const albumData = await albumPath.get();

    const widgetWithThisAlbum = await this._checkAlbumInWidgets(
      albumData.ref,
      userId,
    );
    if (widgetWithThisAlbum.length) {
      throw new HttpException(
        'this album is used in widgets',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await albumPath.delete();
  }

  private async _checkAlbumInWidgets(
    albumRef: admin.firestore.DocumentReference<admin.firestore.DocumentData>,
    userId: string,
  ) {
    const allWidgets = await this.db
      .collection('shops')
      .doc(userId)
      .collection('widgets')
      .get();
    const widgetsWithThisAlbum = allWidgets.docs.map((widget) => {
      const widgetAlbumId = widget.data().albumRef.id;
      if (widgetAlbumId == albumRef.id) {
        return widget;
      }
    });
    return widgetsWithThisAlbum.filter(Boolean);
  }

  async deleteAlbumWithWidgets({ userId, albumId }: DeleteAlbumDto) {
    try {
      const albumPath = this.database
        .collection('shops')
        .doc(userId)
        .collection('albums')
        .doc(albumId);

      const albumData = await albumPath.get();

      const widgetWithThisAlbum = await this._checkAlbumInWidgets(
        albumData.ref,
        userId,
      );
      if (widgetWithThisAlbum) {
        widgetWithThisAlbum.forEach(async (widget) => {
          await widget.ref.delete();
        });
      }
      return await albumPath.delete();
    } catch (error) {
      throw error;
    }
  }

  async createAlbum(
    { posts, albumName, userId, instagramId }: CreateAlbumDto,
    albumId: string,
  ) {
    try {
      const albumDocRef = this.db
        .collection('shops')
        .doc(String(userId))
        .collection('albums')
        .doc(albumId);

      await albumDocRef.set({ albumName });

      const albumPostsRef = albumDocRef.collection('posts');

      posts.forEach(async (post) => {
        const postData = await this.db
          .collection('shops')
          .doc(String(userId))
          .collection('instagram_accounts')
          .doc(String(post.instagramId))
          .collection('posts')
          .doc(String(post.id))
          .get();

        await albumPostsRef.add({
          selected: post.selected ?? false,
          isShown: post.isShown ?? true,
          pinned: post.pinned ?? false,
          productTags: post.productTags ?? {},
          postRef: postData.ref,
        });
      });
      return { albumId, posts };
    } catch (error) {
      console.log(error);
    }
  }

  async patchAlbumData({
    albumId,
    posts,
    userId,
    albumName,
  }: PatchAlbumDataDto) {
    const albumRef = this.database
      .collection('shops')
      .doc(String(userId))
      .collection('albums')
      .doc(String(albumId));
    if (albumName) albumRef.update({ albumName });
    if (posts) {
      await this.updatePostsInAlbum(posts, userId, albumId);
    }
    return { albumId, posts, userId, albumName };
  }

  async updatePostsInAlbum(
    posts: Array<PostAttributesDto>,
    userId: string,
    albumId: string,
  ) {
    try {
      const postsDocs = await this.database
        .collection('shops')
        .doc(userId)
        .collection('albums')
        .doc(albumId)
        .collection('posts')
        .get();
      postsDocs.docs.forEach(async (post) => {
        const postId = post.data().postRef.id;
        const updatePostAttributes = posts.find((elem) => elem.id == postId);
        if (updatePostAttributes) {
          post.ref.update({
            isShown: updatePostAttributes.isShown,
            pinned: updatePostAttributes.pinned,
            selected: updatePostAttributes.selected,
            productTags: updatePostAttributes.productTags,
          });
        }
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
