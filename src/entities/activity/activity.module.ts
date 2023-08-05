import { Module } from '@nestjs/common';
import { ActivityController } from './activity.controller';
import { ActivityService } from 'entities/activity/activity.service';
import { PrismaService } from 'services/prisma.service';

@Module({
  controllers: [ActivityController],
  providers: [ActivityService, PrismaService],
  exports: [ActivityService],
})
export class ActivityModule {}
