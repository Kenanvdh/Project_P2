import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User as UserModel, UserDocument } from './user.schema';
import { IUser } from '@indivproj-p2/shared/api';
import { CreateUserDto, UpdateUserDto } from '@indivproj-p2/backend/dto';

@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger(UserService.name);

  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserDocument>
  ) {}

  async getUsers(): Promise<IUser[]> {
    console.log('getUsers called');
    const items = await this.userModel.find().exec();
    return items;
  }

  async getUserById(id: string): Promise<IUser | null> {
    console.log('getUserById called');
    const user = await this.userModel.findOne({ id }).exec();
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return user;
  }

  async createUser(user: CreateUserDto): Promise<IUser> {
    this.logger.log(`Create user ${user.firstName}`);

    const lastUser = await this.userModel.findOne().sort({ id: -1 }).exec();

    // Calculate the new numeric part of the id
    const newNumericId = lastUser
      ? parseInt(lastUser.id.match(/\d+/)[0], 10) + 1 : 1;

    // Set the new id in the song data
    user.id = `${newNumericId}`;

    const createdItem = await this.userModel.create(user);
    return createdItem;
  }

  async editUser(id: string, user: UpdateUserDto): Promise<IUser | null> {
    const updated = await this.userModel.findOneAndUpdate( {id}, user);
    return updated;
  }

  async deleteUser(id: string): Promise<void> {
    this.userModel.findOneAndDelete({ id }).exec();
  }

  // async login(email: string, password: string): IUser {
  //   console.log('login called');
  //   const user = this.userModel.find(
  //     (td) => td.email == email && td.password == password
  //   );
  //   if (!user) {
  //     throw new Error(`User with email ${email} not found`);
  //   }
  //   return user;
  // }
}
