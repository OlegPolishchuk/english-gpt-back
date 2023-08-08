import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from 'auth/utils/guards';
import { Request, Response } from 'express';
import { User } from '@prisma/client';
import { AuthService } from 'auth/auth.service';
import { AuthGuard } from 'auth/utils/jwtGuard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleGoogleLogin() {
    return { message: 'google auth' };
  }

  @Get('/google/redirect')
  @UseGuards(GoogleAuthGuard)
  async handleGoogleRedirect(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log('req.user from controller', req.user);
    if (req.user) {
      const user = req.user as User;
      const { accessToken, refreshToken } = await this.authService.createNewTokens(
        user.email,
      );

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
      });
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
      });
    }

    return { status: 'ok' };
  }

  @UseGuards(AuthGuard)
  @Get('/')
  async me(@Req() req: Request) {
    const { email } = req.user as { email: Email };

    return await this.authService.getUserDataFromTokenEmail(email);
  }
}
