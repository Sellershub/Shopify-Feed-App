import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateWidgetDto } from '~/modules/albums/dtos/create-widget.dto';
import { PostAttributesDto } from '~/modules/posts/dtos/post-attributes.dto';
import { FirebaseService } from './firebase.service';
import * as admin from 'firebase-admin';
import { UpdateWidgetDto } from '~/modules/widget/dtos/update-widget.dto';
import { DeleteWidgetDto } from '../../widget/dtos/delete-widget.dto';

@Injectable()
export class FirebaseWidgetService extends FirebaseService {
  async createWidget({
    userId,
    widgetOptions,
    widgetId,
    albumId,
    widgetName,
  }: CreateWidgetDto & { widgetId: string }) {
    try {
      const albumRef = (
        await this.db
          .collection('shops')
          .doc(String(userId))
          .collection('albums')
          .doc(albumId)
          .get()
      ).ref;
      return await this.db
        .collection('shops')
        .doc(String(userId))
        .collection('widgets')
        .doc(widgetId)
        .set({ ...widgetOptions, albumRef, widgetName });
    } catch (error) {
      console.log(error);
    }
  }

  async getUsersWidgets(userId: string) {
    try {
      const widgetsDocs = await this.db
        .collection('shops')
        .doc(String(userId))
        .collection('widgets')
        .get();
      const res = Promise.all(
        widgetsDocs.docs.map(async (widget) => {
          // console log widget data
          const widgetResData = <Record<string, any>>{};
          const widgetData = widget.data();
          const widgetAlbumRef: admin.firestore.DocumentReference<admin.firestore.DocumentData> =
            widgetData.albumRef;
          const widgetAlbumData = (await widgetAlbumRef.get()).data();
          widgetResData.id = widget.id;
          widgetResData.albumName = widgetAlbumData?.albumName;
          widgetResData.template = widgetData?.template;
          widgetResData.totalItems = await this.countShownPosts(widgetAlbumRef);

          widgetResData.widgetName = widgetData.widgetName;
          return widgetResData;
        }),
      );
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  private async countShownPosts(
    albumRef: admin.firestore.DocumentReference<admin.firestore.DocumentData>,
  ) {
    const postsDocs = (await albumRef.collection('posts').get()).docs;
    let sum = 0;
    postsDocs.forEach((doc) => {
      if (doc.data().isShown === true) {
        sum++;
      }
    });
    return sum;
  }

  async getWidgetById(userId: string, widgetId: string) {
    const widget = await this.db
      .collection('shops')
      .doc(String(userId))
      .collection('widgets')
      .doc(String(widgetId))
      .get();

    const widgetData = widget.data();

    const widgetDocs = (await widgetData.albumRef.collection('posts').get())
      .docs;
    const res = <Record<string, any>>{};
    res.widgetId = widget.id;
    res.widgetName = widgetData?.widgetName;
    res.options = this.omitAlbumRef(widgetData);
    res.albumId = (await widgetData.albumRef.get()).id;
    res.albumName = (await widgetData.albumRef.get()).data().albumName;
    res.posts = await Promise.all(
      widgetDocs.map(async (postDoc) => {
        const postData = postDoc.data();
        if (postData.isShown) {
          const { postRef } = postDoc.data();
          const postFullData = (await postRef.get()).data();
          return postFullData;
        }

        return postData;
      }),
    );

    return res;
  }

  async updateWidget({
    userId,
    widgetOptions,
    albumId,
    widgetId,
    widgetName,
  }: UpdateWidgetDto) {
    const widgetRef = this.db
      .collection('shops')
      .doc(String(userId))
      .collection('widgets')
      .doc(widgetId);

    const albumRef = (
      await this.db
        .collection('shops')
        .doc(String(userId))
        .collection('albums')
        .doc(albumId)
        .get()
    ).ref;
    return await widgetRef.update({ albumRef, ...widgetOptions, widgetName });
  }

  async deleteWidgetById({ userId, widgetId }: DeleteWidgetDto) {
    try {
      return await this.db
        .collection('shops')
        .doc(userId)
        .collection('widgets')
        .doc(widgetId)
        .delete();
    } catch (error) {
      console.log(error);
    }
  }

  private omitAlbumRef(data: Record<string, any>) {
    const { albumRef: _, ...res } = data;
    return res;
  }
}
