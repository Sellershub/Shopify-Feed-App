import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateWidgetDto } from '../albums/dtos/create-widget.dto';
import { GetWidgetDto } from '../albums/dtos/get-widget.dto';
import { FirebaseWidgetService } from '../firebase/services/firebase-widget.service';
import { DeleteWidgetDto } from './dtos/delete-widget.dto';
import { GetWidgetByIdDto } from './dtos/get-widget-by-id.dto';
import { UpdateWidgetDto } from './dtos/update-widget.dto';

@Injectable()
export class WidgetService {
  constructor(private readonly firebaseWidget: FirebaseWidgetService) {}
  public async createWidget(createWidgetDto: CreateWidgetDto) {
    const widgetId = randomUUID();
    return await this.firebaseWidget.createWidget({
      ...createWidgetDto,
      widgetId,
    });
  }

  public async getUsersWidget(userId: string) {
    return await this.firebaseWidget.getUsersWidgets(userId);
  }

  public async getWidgetById(getWidgetByIdDto: GetWidgetByIdDto) {
    return await this.firebaseWidget.getWidgetById(
      getWidgetByIdDto.userId,
      getWidgetByIdDto.widgetId,
    );
  }

  public async updateWidget(updateWidgetDto: UpdateWidgetDto) {
    return await this.firebaseWidget.updateWidget(updateWidgetDto);
  }

  public async deleteWidgetById(deleteWidgetDto: DeleteWidgetDto) {
    return await this.firebaseWidget.deleteWidgetById(deleteWidgetDto);
  }
}
