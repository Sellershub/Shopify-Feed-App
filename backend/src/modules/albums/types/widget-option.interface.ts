import { PostAttributesDto } from '~/modules/posts/dtos/post-attributes.dto';

export interface Layout {
  columns: number;
  rows: number;
  padding: number;
  borderRadius: number;
  mobileColumns: number;
  mobileRows: number;
  backgroundColor: string;
}

export interface Heading {
  radio: string[];
  enableTitle: boolean;
  enableDescription: boolean;
  enableButton: boolean;
}

export interface Items {
  enableHover: boolean;
  backgroundColor: string;
  opacity: number;
  color: string;
  textAlign: string;
  textSize: number;
  textWeight: number;
  caption: boolean;
}

export interface Popup {
  profile: boolean;
  profileTab: string;
  folowBtn: boolean;
  folowBtnText: string;
  caption: boolean;
  date: boolean;
  instaView: boolean;
  instaViewTab: string;
}

export interface Shoppable {
  showIcon: boolean;
  hotSpotColor: string;
  hotSpotHover: string;
  opacity: number;
  hotspotLink: string;
  displayProduct: string;
  ctaBtn: string;
  ctaBtnText: string;
  ctaBtnColor: string;
  ctaBtnTextColor: string;
}

export interface Settings {
  selectedSettings?: any;
  device: number;
  position?: any;
  layout: Layout;
  heading: Heading;
  items: Items;
  popup: Popup;
  shoppable: Shoppable;
}

export interface WidgetOption {
  posts: PostAttributesDto[];
  loader?: any;
  widgetName:string;
  settings: Settings;
}
