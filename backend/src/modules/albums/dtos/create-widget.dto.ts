import { WidgetOption } from '../types/widget-option.interface';

export class CreateWidgetDto {
  albumId: string;
  userId: string;
  widgetName: string;
  widgetOptions: WidgetOption;
}
