import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CreateWidgetDto } from '../albums/dtos/create-widget.dto';
import { WidgetService } from './widget.service';
import { GetWidgetByIdDto } from './dtos/get-widget-by-id.dto';
import { UpdateWidgetDto } from './dtos/update-widget.dto';
import { DeleteWidgetDto } from './dtos/delete-widget.dto';

@Controller('widget')
export class WidgetController {
  constructor(private readonly widgetService: WidgetService) {}

  @Post()
  public async createWidget(@Body() createWidgetDto: CreateWidgetDto) {
    return await this.widgetService.createWidget(createWidgetDto);
  }

  @Get()
  public async getUsersWidgets(@Query('userId') userId: string) {
    return await this.widgetService.getUsersWidget(userId);
  }

  @Get('id')
  public async getWidgetById(@Query() getWidgetByIdDto: GetWidgetByIdDto) {
    const res = await this.widgetService.getWidgetById(getWidgetByIdDto);
    return res;
  }

  @Delete()
  public async deleteWidgetById(@Query() deleteWidgetDto:DeleteWidgetDto){
    return await this.widgetService.deleteWidgetById(deleteWidgetDto);
  }

  @Post('update')
  public async updaPostData(@Body() createWidgetDto: UpdateWidgetDto) {
    return await this.widgetService.updateWidget(createWidgetDto);
  }

}
