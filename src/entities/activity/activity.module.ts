import { Module } from '@nestjs/common';
import { ActivityController } from './activity.controller';
import { ActivityService } from 'entities/activity/activity.service';

@Module({
  controllers: [ActivityController],
  providers: [ActivityService],
})
export class ActivityModule {}
