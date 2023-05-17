import { PostAttributesDto } from '~/modules/posts/dtos/post-attributes.dto';
import { AlbumPostsUpdateType } from './album-posts-update.type';

export class PatchAlbumDataDto {
  userId: string;
  albumId: string;
  albumName?: string;
  posts?: Array<PostAttributesDto>;
}
