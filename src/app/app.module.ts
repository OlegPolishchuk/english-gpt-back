import { Module } from '@nestjs/common';
import { ConfigModule } from 'config.module';
import { AppController } from 'app/app.controller';

@Module({
  imports: [ConfigModule],
  controllers: [AppController],
})
export class AppModule {}
