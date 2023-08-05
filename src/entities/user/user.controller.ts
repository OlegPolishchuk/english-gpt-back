import { Controller } from '@nestjs/common';
import { UserService } from 'entities/user/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
}
