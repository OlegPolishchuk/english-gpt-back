import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from 'entities/user/user.service';
import { UserDto } from 'entities/user/dto/user.dto';
import { BadGatewayException } from 'exeptions/badGateway';
import { Request } from 'express';
import { AuthService } from 'auth/auth.service';
import { AuthGuard } from 'auth/utils/jwtGuard';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/')
  async createNewUser(@Body() userData: UserDto) {
    try {
      return this.userService.createUser(userData);
    } catch (e) {
      // throw new BadGatewayException();
      console.log(e);
    }
  }

  @UseGuards(AuthGuard)
  @Get('/')
  async getUserData(@Req() req: Request) {
    try {
      if (req.user) {
        const { email } = req.user as { email: Email };
        return await this.userService.getUserData(email);
      }
    } catch (e) {
      throw new BadGatewayException(e);
    }
  }
}
