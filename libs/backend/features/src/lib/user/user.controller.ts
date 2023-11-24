import { Controller, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { Get, Param, Post, Body } from '@nestjs/common';
import { IUser } from '@indivproj-p2/shared/api';
import { pseudoRandomBytes } from 'crypto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  getUsers(): IUser[] {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string): IUser {
    return this.userService.getUserById(id);
  }

  @Post('')
  createUser(@Body() user: IUser): IUser {
    return this.userService.createUser(user);
  }

  @Post('/login')
  login(@Body() user: IUser): IUser {
    return this.userService.login(user);
  }

  @Put('/:id')
  editUser(@Param('id') id: string, @Body() user: IUser): IUser {
    return this.userService.editUser(user);
  }

  @Delete('/:id')
  deleteUSer(@Param('id') id: string): void {
    this.userService.deleteUser(id);
  }
}
