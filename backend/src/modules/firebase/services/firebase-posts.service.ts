import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PostAttributesDto } from '~/modules/posts/dtos/post-attributes.dto';
import { FirebaseService } from './firebase.service';

@Injectable()
export class FirebasePostsService extends FirebaseService {
  async setData(
    collectionName: string,
    documentName: string,
    data: Record<string, any>,
  ) {
    try {
      const docRef = this.db.collection(collectionName).doc(documentName);
      return await docRef.set(data);
    } catch (error) {
      console.log(error);
    }
  }

  async setPosts(
    instagramId: string,
    userId: string,
    postId: string,
    data: Record<string, any>,
  ) {
    try {
      
      const docRef = this.db
        .collection('shops')
        .doc(userId)
        .collection('instagram_accounts')
        .doc(instagramId)
        .collection('posts')
        .doc(postId);
        
      await docRef.set(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async getPostsByTags(tags: string[], userId: string) {
    const postsRef = await this.db
      .collection('user_posts')
      .doc(userId)
      .collection('posts')
      .where('tags', 'array-contains-any', tags)
      .get();
    return postsRef.docs;
  }

  async changePostsAtributes(newAttributes: PostAttributesDto, userId: string) {
    try {
      const postsRef = await this.db
        .collection('user_posts')
        .doc(userId)
        .collection('posts')
        .where('id', '==', newAttributes.id)
        .get();
      for await (const document of postsRef.docs) {
        document.ref.update({ ...newAttributes });
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'could not change attributes of posts',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
