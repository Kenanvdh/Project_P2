import { Prop, Schema, SchemaFactory, getConnectionToken } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { IUser } from '@indivproj-p2/shared/api';
import { UserRole, Gender } from '@indivproj-p2/shared/api';
import { IsMongoId } from 'class-validator';

export type UserDocument = User & Document;

@Schema()
export class User implements IUser {
  @IsMongoId()
  _id!: string;

  @Prop({
    unique: true,
  })
  id!: string;

  @Prop({
    required: true,
  })
  firstName!: string;

  @Prop({
    required: true,
  })
  lastName!: string;

  @Prop({
    required: true,
  })
  age!: number;

  @Prop({
    required: true,
    type: String,
  })
  password = '';

  @Prop({
    required: true,
    type: String,
  })
  role: UserRole = UserRole.guest;

  @Prop({
    required: true,
    type: String,
    default: Gender.other,
  })
  gender: Gender = Gender.other;

  @Prop({
    required: true,
    type: String ,
    unique: true,
  })
  email = '';

}

export const UserSchema = SchemaFactory.createForClass(User);
