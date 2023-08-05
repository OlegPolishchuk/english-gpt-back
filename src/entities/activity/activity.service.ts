import { Injectable } from '@nestjs/common';
import { PrismaService } from 'services/prisma.service';
import { Activity, Prisma } from '@prisma/client';
import { ActivityDto } from 'entities/activity/dto/activity.dto';

@Injectable()
export class ActivityService {
  constructor(private prisma: PrismaService) {}

  // Insert Activity to DB
  async createActivity(userEmail: Email) {
    const activity = await this.createNewActivity(userEmail);

    return this.prisma.activity.create({
      data: activity,
    });
  }

  // Update Activity
  async updateActivity(activities: Activity): Promise<Activity> {
    return this.prisma.activity.update({
      where: { id: activities.id },
      data: { ...activities },
    });
  }

  // Create Activities for new User
  private async createNewActivity(userEmail: Email): Promise<ActivityDto> {
    return {
      user_email: userEmail,
      last_visit: new Date().toISOString(),
      total_count_of_visits: 1,
      week_count_of_visits: 1,
      consecutive_visits: 1,
      dates_of_visits: [new Date().toISOString()],
    };
  }
}
