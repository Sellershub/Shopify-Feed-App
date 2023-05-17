import { PostAttributesDto } from '~/modules/posts/dtos/post-attributes.dto';

export type AlbumPostsUpdateType = {
  added?: Array<PostAttributesDto>;
  updated?: Array<PostAttributesDto>;
  deleted?: Array<PostAttributesDto>;
};
