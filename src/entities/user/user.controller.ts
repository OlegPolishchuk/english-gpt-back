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

  @Get('/:email')
  async getUserData(@Param() email: Email) {
    console.log({ email });
    console.log(typeof email);
    try {
      const user = await this.userService.getUserData(email);
      console.log(user);
      return user;
    } catch (e) {
      throw new BadGatewayException(e);
    }
  }
}
