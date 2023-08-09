import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'services/prisma.service';
import { UserDto } from 'entities/user/dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'entities/user/user.service';
import { Prisma } from '@prisma/client';
import { JWT } from 'constants/jwt';
import { Request, Response } from 'express';

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

  async refreshTokens(token: string) {
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const { email }: { email: Email } = await this.jwt.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      return await this.createNewTokens(email);
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException();
    }
  }

  async setTokenToCookie(
    tokens: { accessToken: string; refreshToken: string },
    res: Response,
  ) {
    const { accessToken, refreshToken } = tokens;

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
    });
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
    });
  }
}
