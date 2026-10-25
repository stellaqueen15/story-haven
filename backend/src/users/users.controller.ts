import { Body, Controller, Patch, Put } from '@nestjs/common';
import { CurrentUserId } from '../auth/current-user.decorator';
import { UsersService } from './users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Patch('profile')
  updateProfile(@CurrentUserId() userId: number, @Body() input: UpdateProfileDto) {
    return this.users.updateProfile(userId, input);
  }

  @Put('password')
  updatePassword(@CurrentUserId() userId: number, @Body() input: UpdatePasswordDto) {
    return this.users.updatePassword(userId, input);
  }
}
