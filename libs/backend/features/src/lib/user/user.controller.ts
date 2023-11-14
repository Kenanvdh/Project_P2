import { Controller } from '@nestjs/common';
import { UserService } from '../user.service';
import { Get, Param, Post, Body } from '@nestjs/common';
import { IUser } from '@indivproj-p2/shared/api';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  getAll(): IUser[] {
    return this.userService.getUsers();
  }

  @Get(':id')
  getOne(@Param('id') id: number): IUser {
    return this.userService.getUserById(id);
  }
}
