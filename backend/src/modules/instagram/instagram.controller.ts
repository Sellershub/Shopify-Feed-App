import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { AuthDataDto } from '../shopify/dto/authData.dto';
import { CreateAlbumDto } from './dtos/create-album.dto';
import { GetPostsByTagDto } from './dtos/get-posts-by-tags.dto';
import { InstagramService } from './instagram.service';

@Controller('instagram')
export class InstagramController {
  constructor(private readonly instagramService: InstagramService) {}
  @Get('auth')
  public shopifyAuth() {
    return this.instagramService.shopifyAuth();
  }

  @Post('auth/token')
  public async authCode(@Body() authCode: any, @Req() req) {
    return this.instagramService.authCode(authCode);
  }

  @Post('add')
  public async addInstagramAcc(@Body() authData: AuthDataDto) {
    return await this.instagramService.setInstaAcc(authData);
  }
}
