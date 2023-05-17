import { HttpService } from '@nestjs/axios';
import { Body, Injectable } from '@nestjs/common';
import { firstValueFrom, catchError } from 'rxjs';
import { AxiosError } from 'axios';
import { AuthDataDto } from '../shopify/dto/authData.dto';
import { FirebasePostsService } from '../firebase/services/firebase-posts.service';
import { FirebaseInstagramService } from '../firebase/services/firebase-insagran.service';

@Injectable()
export class InstagramService {
  constructor(
    private readonly httpService: HttpService,
    private readonly firebaseInstagramService: FirebaseInstagramService,
    private readonly firebasePostsService: FirebasePostsService,
  ) {}
  public shopifyAuth() {
    const instagrammAppId = process.env.INSTAGRAMM_APP_ID;
    const redirectUrl = process.env.INSTAGRAMM_REDIRECT_URL;
    const authUrl = {
      authUri: `https://api.instagram.com/oauth/authorize?client_id=${instagrammAppId}&redirect_uri=${redirectUrl}&scope=user_profile&response_type=code`,
    };
    return authUrl;
  }

  public async authCode(@Body() authCode: any) {
    if (!authCode) {
      console.log('code are not valid');
      return '';
    }
    const code = authCode.code;
    const client_id = +process.env.INSTAGRAMM_APP_ID;
    const client_secret = process.env.INSTAGRAMM_APP_SECRET;
    const redirect_uri = process.env.INSTAGRAMM_REDIRECT_URL;
    const exchangeUrl = `https://api.instagram.com/oauth/access_token`;
    const body = {
      client_id,
      client_secret,
      grant_type: 'authorization_code',
      redirect_uri,
      code,
    };
    // console.log('authorization code to get authorization token', code);
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const { data } = await firstValueFrom(
      this.httpService.post(exchangeUrl, body, { headers }).pipe(
        catchError((error: AxiosError) => {
          console.log(error, 'error');
          throw 'invalid instagram api request';
        }),
      ),
    );

    return data;
  }

  public async setInstaAcc({ access_token, instagramId, userId }: AuthDataDto) {
    const instagramPosts = await this.getPostsFromInsta({
      access_token,
      instagramId,
      userId,
    });
    await this.firebaseInstagramService.setInstaData(
      userId,
      instagramId,
      access_token,
    );
    instagramPosts.data.foreach(async (post) => {
      const instaTags = post?.caption?.split('#').slice(1) ?? [];
      await this.firebasePostsService.setPosts(instagramId, userId, post.id, {
        ...post,
        instaTags,
        instagramId: instagramId,
      });
    });
  }

  public async getPostsFromInsta({ access_token, instagramId }: AuthDataDto) {
    const firstResponse = await firstValueFrom(
      this.httpService.get(
        `https://graph.instagram.com/${instagramId}?fields=id,username&access_token=${access_token}`,
      ),
    );
    const instaPosts = await firstValueFrom(
      this.httpService.get(
        `https://graph.instagram.com/me/media?fields=caption,id,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=${access_token}`,
      ),
    );
    return {
      data: instaPosts.data.data,
      instagramUserId: instagramId,
      access_token,
    };
  }
}
