import { Injectable } from '@nestjs/common';
import { PrismaService } from 'services/prisma.service';
import { Activity } from '@prisma/client';

@Injectable()
export class ActivityService {
  constructor(private prisma: PrismaService) {}

  // Update Activity
  async updateActivity(activities: Activity): Promise<Activity> {
    return this.prisma.activity.update({
      where: { id: activities.id },
      data: { ...activities },
    });
  }
}
