import { Module } from '@nestjs/common';
import { ConfigModule } from 'config.module';
import { UserModule } from 'entities/user/user.module';
import { ActivityModule } from 'entities/activity/activity.module';
import { PrismaService } from 'services/prisma.service';

@Module({
  imports: [ConfigModule, UserModule, ActivityModule],
  providers: [PrismaService],
})
export class AppModule {}
