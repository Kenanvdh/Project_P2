import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
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
    unique: true,
  })
  firstName!: string;

  @Prop({
    required: true,
    unique: true,
  })
  lastName!: string;

  @Prop({
    required: true,
    unique: true,
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
    type: String,
    // validate: {
    //     validator: isEmail,
    //     message: 'should be a valid email address'
    // }
  })
  email = '';

//   @Prop({
//     default: [],
//     type: [MongooseSchema.Types.ObjectId],
//     ref: 'Meal',
//   })
//   songs: ISong[] = [];
}

export const UserSchema = SchemaFactory.createForClass(User);
