import { PostAttributesDto } from '~/modules/posts/dtos/post-attributes.dto';

export class CreateAlbumDto {
  albumName: string;
  posts: Array<PostAttributesDto>;
  userId: string;
  instagramId: string;
}
