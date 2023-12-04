import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { IList, ISong, IUser } from '@indivproj-p2/shared/api';
import { IsMongoId } from 'class-validator';

export type ListDocument = List & Document;

@Schema()
export class List implements IList {
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
  name!: string;

  @Prop({
    required: true,
  })
  description!: string;

  @Prop({
    type: Object
  })
  creator!: IUser;

  @Prop({
    type: Object
  })
  songs: ISong[] = [];

  @Prop({
    required: true,
  })
  numOfSongs!: number;

  @Prop({
  })
  creationDate!: Date;
}

export const ListSchema = SchemaFactory.createForClass(List);
