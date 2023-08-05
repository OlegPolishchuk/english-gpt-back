import { Injectable } from '@nestjs/common';
import { PrismaService } from 'services/prisma.service';
import { Activity, Prisma, User } from '@prisma/client';

interface UserData extends User {
  Activity: Activity[];
}

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // Create New User
  async createUser(user: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data: user });
  }

  // Get User By Email
  async getUserByEmail(email: Email): Promise<Nullable<User>> {
    return this.prisma.user.findFirst({ where: { email } });
  }

  // Get User Data with Activity
  async getUserData(email: Email): Promise<Nullable<UserData>> {
    return this.prisma.user.findFirst({
      where: { email },
      include: {
        Activity: true,
      },
    });
  }
}
