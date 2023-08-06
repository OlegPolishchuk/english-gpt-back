import { Injectable } from '@nestjs/common';
import { PrismaService } from 'services/prisma.service';
import { Activity, Prisma, User } from '@prisma/client';
import { ActivityService } from 'entities/activity/activity.service';

export interface GetUserDataResponse extends User {
  Activity: Activity[];
}

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private activityService: ActivityService) {}

  async createUser(user: Prisma.UserCreateInput): Promise<User> {
    const userData = await this.prisma.user.create({ data: user });
    await this.activityService.createActivity(userData.email);

    return userData;
  }

  async getUserByEmail(email: Email): Promise<Nullable<User>> {
    return this.prisma.user.findFirst({ where: { email } });
  }

  async getUserData(email: Email): Promise<Nullable<GetUserDataResponse>> {
    if (!email) return null;

    console.log(`email in service`, email);

    return this.prisma.user.findFirst({
      where: { email },
      include: {
        Activity: true,
      },
    });
  }
}
