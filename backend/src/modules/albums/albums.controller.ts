import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateAlbumDto } from '../instagram/dtos/create-album.dto';
import { ChangePostAttributes } from '../posts/dtos/change-post-attributes.dto';
import { PostsService } from '../posts/posts.service';
import { AlbumsService } from './albums.service';
import { DeleteAlbumDto } from './dtos/delete-album.dto';
import { GetAlbumByIdDto } from './dtos/get-album-by-id.dto';
import { GetUserAlbumsDto } from './dtos/get-user-albums.dto';
import { PatchAlbumDataDto } from './dtos/patch-album-data.dto';
import { CreateWidgetDto } from './dtos/create-widget.dto';
import { GetWidgetDto } from './dtos/get-widget.dto';
@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumService: AlbumsService) {}
  @Post()
  public async createAlbums(@Body() createAlbumsDto: CreateAlbumDto) {
    const res = await this.albumService.createAlbum(createAlbumsDto);

    return res;
  }

  @Get('widget')
  public async getWidget(@Query() getWidgetDto: GetWidgetDto) {}

  @Get()
  public async getUserAlbums(@Query() getUserAlbumsDto: GetUserAlbumsDto) {
    const res = await this.albumService.getUsersAlbums(getUserAlbumsDto);
    
    return res;
  }

  @Post('test')
  public async patchAlbumData(@Body() patchAlbumDataDto: PatchAlbumDataDto) {
    return await this.albumService.pathcAlbumData(patchAlbumDataDto);
  }

  @Get('id')
  public async getAlbumsById(@Query() getAlbumByIdDto: GetAlbumByIdDto) {
    const res= await this.albumService.getAlbumById(getAlbumByIdDto);
    
    return res
    
  }

  @Delete()
  public async deleteAlbum(@Query() deleteAlbumDto: DeleteAlbumDto) {
    return await this.albumService.deleteAlbum(deleteAlbumDto);
  }

  @Delete('completely')
  public async deleteAlbumWithWidgets(@Query() deleteAlbumDto: DeleteAlbumDto) {
    return await this.albumService.deleteAlbumWithWidgets(deleteAlbumDto);
  }
}
