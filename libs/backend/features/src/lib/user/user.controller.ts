import { Controller, Delete, Put, Get, Param, Post, Body} from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from '@indivproj-p2/shared/api';
import { CreateUserDto, UpdateUserDto } from '@indivproj-p2/backend/dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  getUsers(): Promise<IUser[]> {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string): Promise<IUser | null> {
    return this.userService.getUserById(id);
  }

  @Post('')
  createUser(@Body() user: CreateUserDto): Promise<IUser> {
    return this.userService.createUser(user);
  }

  @Put('/:id')
  editUser(@Param('id') id: string, @Body() user: UpdateUserDto): Promise<IUser | null> {
    return this.userService.editUser(id, user);
  }

  @Delete('/:id')
  deleteUSer(@Param('id') id: string, user: IUser): Promise<void> {
    return this.userService.deleteUser(id, user);
  }

  // @Post('login')
  // login(@Body() user: IUser): IUser {
  //   return this.userService.login(user.email, user.password);
  // }
}
