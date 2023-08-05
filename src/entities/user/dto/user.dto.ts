import { IsEmail, IsISO8601, IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  @IsEmail()
  email: Email;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  image: ImgSrs;

  @IsISO8601()
  created: Date;
}
