import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { GetPostsByTagDto } from '../instagram/dtos/get-posts-by-tags.dto';
import { AuthDataDto } from '../shopify/dto/authData.dto';
import { ChangePostAttributes } from './dtos/change-post-attributes.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  public async getPosts(@Query() authData: AuthDataDto) {
    const res = await this.postsService.getPosts(authData);
    return res;
  }

  @Get('hashtag')
  public async getPostsByHashtag(@Query() queryData: GetPostsByTagDto) {
    const res = await this.postsService.getPostsByTags(queryData);
    return res;
  }

  @Post('attributes')
  public async changePostsAttributes(
    @Body() changePostsDto: ChangePostAttributes,
  ) {
    const res = await this.postsService.changePostsAttributes(changePostsDto);
    return res;
  }
}
