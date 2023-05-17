import { Module } from '@nestjs/common';
import { WidgetService } from './widget.service';
import { WidgetController } from './widget.controller';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  imports:[FirebaseModule],
  controllers: [WidgetController],
  providers: [WidgetService]
})
export class WidgetModule {}
