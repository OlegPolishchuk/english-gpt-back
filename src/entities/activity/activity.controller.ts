import { Controller, Get, Param, Put } from '@nestjs/common';
import { ActivityService } from 'entities/activity/activity.service';

@Controller('activity')
export class ActivityController {
  constructor(private activityService: ActivityService) {}

  @Get()
  async getUserActivity(@Param() userEmail: Email) {
    return this.activityService.getUserActivity(userEmail);
  }

  @Put()
  async updateActivity(userEmail: Email) {
    return this.activityService.updateActivity(userEmail);
  }
}
