import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User as UserModel, UserDocument } from './user.schema';
import { IUser } from '@indivproj-p2/shared/api';
import { CreateUserDto, UpdateUserDto } from '@indivproj-p2/backend/dto';
import { sign } from 'jsonwebtoken';
import { randomBytes } from 'crypto';


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

    const lastUser = await this.userModel.findOne().sort({ _id: -1 }).exec();

    if(lastUser){
      user.id = String(Number(lastUser.id) + 1);
    }
    else{
      user.id = '1';
    }


    const createdItem = await this.userModel.create(user);
    return createdItem;
  }

  async editUser(id: string, user: UpdateUserDto): Promise<IUser | null> {
    const updated = await this.userModel.findOneAndUpdate({ id }, user);
    return updated;
  }

  async deleteUser(id: string): Promise<void> {
    this.userModel.findOneAndDelete({ id }).exec();
  }

  async login(email: string, password: string): Promise<IUser> {
    console.log('login called');
    const user = await this.userModel
      .findOne({ email, password })
      .lean()
      .exec();
    if (!user) {
      throw new Error(`User with email ${email} not found`);
    }
  
    const secretKey = randomBytes(32).toString('hex');
    const userId = user._id.toString();
    const token = sign({ userId }, secretKey, {
      expiresIn: '1h',
    });
    
    const response = { ...user, token };
    console.log('First Backend Response:', response);
    return response;
  }
  
}
