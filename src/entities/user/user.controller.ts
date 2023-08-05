import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from 'entities/user/user.service';
import { UserDto } from 'entities/user/dto/user.dto';
import { BadGatewayException } from 'exeptions/badGateway';

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

  @Get('/')
  async getUserData(@Param() email: Email) {
    try {
      return this.userService.getUserData(email);
    } catch (e) {
      throw new BadGatewayException(e);
    }
  }
}
