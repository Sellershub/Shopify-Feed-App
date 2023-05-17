import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FirebaseInstagramService } from '../firebase/services/firebase-insagran.service';
import { FirebasePostsService } from '../firebase/services/firebase-posts.service';
import { FirebaseService } from '../firebase/services/firebase.service';
import { GetPostsByTagDto } from '../instagram/dtos/get-posts-by-tags.dto';
import { InstagramService } from '../instagram/instagram.service';
import { AuthDataDto } from '../shopify/dto/authData.dto';
import { ChangePostAttributes } from './dtos/change-post-attributes.dto';

@Injectable()
export class PostsService {
  constructor(
    private readonly instagramService: InstagramService,
    private readonly firebasePostService: FirebasePostsService,
    private readonly firebaseInstagramService: FirebaseInstagramService,
  ) {}
  public async getPosts(authData: AuthDataDto) {
    const postFromInsta = await this.instagramService.getPostsFromInsta(
      authData,
    );
    await this.firebaseInstagramService.setInstaData(
      authData.userId,
      authData.instagramId,
      postFromInsta.access_token,
    );

    const res = [];
    for await (const post of postFromInsta.data) {
      const instaTags = post?.caption?.split('#').slice(1) ?? [];
      const postData = await this.firebasePostService.setPosts(
        authData.instagramId,
        String(authData.userId),
        post.id,
        {
          ...post,
          isShown:true,
          pinned:false,
          selected:false,
          productTags:[],
          instaTags,
          instagramId: postFromInsta.instagramUserId,
        },
      );
      res.push(postData);
    }

    return res;
  }

  public async getPostsByTags({ tags, userId }: GetPostsByTagDto) {
    const tagsArr = tags.split(',');
    const data = await this.firebasePostService.getPostsByTags(tagsArr, userId);

    const res = data.map((querySnapshot) => {
      return querySnapshot.data();
    });
    return res;
  }

  public async changePostsAttributes(changePostsDto: ChangePostAttributes) {
    for await (const post of changePostsDto.posts) {
      await this.firebasePostService.changePostsAtributes(
        post,
        changePostsDto.userId,
      );
    }
  }

  public async getUsersPosts() {}
}
