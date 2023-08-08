import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import * as process from 'process';
import { Injectable } from '@nestjs/common';
import { AuthService } from 'auth/auth.service';
import { UserDto } from 'entities/user/dto/user.dto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['profile', 'email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    if (profile && profile.emails?.length && profile.photos?.length) {
      const userDetail: UserDto = {
        email: profile.emails[0].value,
        name: profile.displayName,
        image: profile.photos[0].value,
      };

      const user = await this.authService.validateUser(userDetail);

      return user || null;
    }
  }
}
