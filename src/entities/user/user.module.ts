import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ActivityModule } from 'entities/activity/activity.module';
import { PrismaService } from 'services/prisma.service';

@Module({
  imports: [ActivityModule],
  controllers: [UserController],
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
