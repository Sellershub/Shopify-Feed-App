export class PostAttributesDto {
  id: string;
  instagramId?: string;
  selected?: boolean;
  pinned?: boolean;
  isShown?: boolean;
  productTags?: Array<Record<string, any>>;
}
