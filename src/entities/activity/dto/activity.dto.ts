import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ActivityDto {
  @IsEmail()
  user_email: Email;

  @IsString()
  @IsNotEmpty()
  last_visit: DateString;

  @IsNotEmpty()
  @IsNumber()
  total_count_of_visits: number;

  @IsNotEmpty()
  @IsNumber()
  week_count_of_visits: number;

  @IsNotEmpty()
  @IsNumber()
  consecutive_visits: number;

  @IsNotEmpty()
  dates_of_visits: DateString[];
}
