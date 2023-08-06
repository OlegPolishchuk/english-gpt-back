import { IsEmail, IsISO8601, IsNotEmpty, IsString } from 'class-validator';
import { Optional } from '@nestjs/common';

export class UserDto {
  @IsEmail()
  email: Email;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  image: ImgSrs;

  @Optional()
  @IsISO8601()
  created?: Date;
}
