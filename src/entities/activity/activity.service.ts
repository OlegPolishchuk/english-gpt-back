import { BadGatewayException, Injectable } from '@nestjs/common';
import { PrismaService } from 'services/prisma.service';
import { Activity } from '@prisma/client';
import { ActivityDto } from 'entities/activity/dto/activity.dto';
import { checkDatesToSameWeek } from 'entities/activity/utils/checkDatesToSameWeek';
import { checkDateToYesterday } from 'entities/activity/utils/checkDateToYesterday';
import { checkDatesToSameDay } from 'entities/activity/utils/checkDatesToSameDay';

@Injectable()
export class ActivityService {
  constructor(private prisma: PrismaService) {}

  async createActivity(userEmail: Email): Promise<Nullable<Activity>> {
    const activity = await this.createNewActivity(userEmail);

    return this.prisma.activity.create({
      data: activity,
    });
  }

  async updateActivity(userEmail: Email): Promise<Nullable<Activity>> {
    const userActivity = await this.getUserActivity(userEmail);

    if (userActivity) {
      const lastVisit = userActivity.last_visit;

      const now = new Date().toISOString();
      const isSameWeek = checkDatesToSameWeek(lastVisit, now);
      const isDaysInARow = checkDateToYesterday(lastVisit, now);
      const isSameDay = checkDatesToSameDay(lastVisit, now);

      const updatedData = {
        total_count_of_visits: { increment: 1 },
        week_count_of_visits: { increment: isSameWeek ? 1 : 0 },
        consecutive_visits: { increment: isDaysInARow ? 1 : 0 },
        last_visit: now,
        dates_of_visits: { push: now },
      };

      return this.prisma.activity.update({
        where: { id: userActivity.id },
        data: { ...(!isSameDay && updatedData) },
      });
    }

    return null;
  }

  async getUserActivity(userEmail: Email): Promise<Nullable<Activity>> {
    const activity = await this.prisma.activity.findFirst({
      where: { user_email: userEmail },
    });

    if (!activity) {
      throw new BadGatewayException();
    }

    return activity;
  }

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
