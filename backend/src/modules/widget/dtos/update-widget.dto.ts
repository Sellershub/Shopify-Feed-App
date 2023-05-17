import { WidgetOption } from '~/modules/albums/types/widget-option.interface';

export class UpdateWidgetDto {
  albumId?: string;
  userId: string;
  widgetId:string;
  widgetName:string;
  widgetOptions: WidgetOption;
}
