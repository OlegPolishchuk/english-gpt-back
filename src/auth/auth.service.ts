import { Injectable } from '@nestjs/common';
import { PrismaService } from 'services/prisma.service';
import { UserDto } from 'entities/user/dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'entities/user/user.service';
import { Prisma } from '@prisma/client';
import { JWT } from 'constants/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private userService: UserService,
  ) {}

  async validateUser(userData: UserDto) {
    console.log('Auth service');
    console.log(userData);

    let user = await this.userService.getUserByEmail(userData.email);

    if (!user) {
      const newUser: UserDto = {
        ...userData,
        created: new Date(),
      };

      user = await this.userService.createUser(newUser);
    }

    return user;
  }

  async createNewTokens(userEmail: Email) {
    const data = { email: userEmail };

    const accessToken = this.jwt.sign(data, { expiresIn: JWT.accessExpTime });
    const refreshToken = this.jwt.sign(data, { expiresIn: JWT.refreshExpTime });

    return { accessToken, refreshToken };
  }

  async getUserDataFromTokenEmail(email: Email) {
    return await this.userService.getUserByEmail(email);
  }
}
