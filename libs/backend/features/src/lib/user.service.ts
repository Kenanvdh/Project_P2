import { Controller } from '@nestjs/common';
import { UserService } from '../../../../songlist/features/src/lib/user/user.service';
import { Get, Param, Post, Body } from '@nestjs/common';
import { IUser } from '../../../../shared/api/src/lib/models/user.interface';

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

