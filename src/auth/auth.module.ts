import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './utils/googleStrategy';
import { PrismaService } from 'services/prisma.service';
import { UserModule } from 'entities/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'process';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AuthController],
  providers: [GoogleStrategy, PrismaService, AuthService],
})
export class AuthModule {}
