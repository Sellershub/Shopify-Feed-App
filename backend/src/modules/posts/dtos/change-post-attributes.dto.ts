import { PostAttributesDto } from './post-attributes.dto';

export class ChangePostAttributes {
  userId: string;
  posts: Array<PostAttributesDto>;
}
