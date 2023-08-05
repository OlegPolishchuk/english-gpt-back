import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { UserModule } from './entities/user/user.module';
import { ActivityService } from './entities/activity/activity.service';
import { ActivityModule } from './entities/activity/activity.module';

@Module({
  imports: [NestConfigModule.forRoot(), UserModule, ActivityModule],
  providers: [ActivityService],
})
export class ConfigModule {}
