import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { IList } from '@indivproj-p2/shared/api';
import { IsMongoId } from 'class-validator';
import { Song } from '../song/song.schema';

export type ListDocument = List & Document;

@Schema()
export class List implements IList {
  @IsMongoId()
  _id!: string;

  @Prop({})
  id!: string;

  @Prop({
    required: true,
  })
  name!: string;

  @Prop({
    required: true,
  })
  description!: string;

  @Prop({
    required: true,
  })
  creatorId!: string;

  @Prop({
    required: true,
    type: [Song],
    ref: 'Song',
  })
  songs: Song[] = [];

  @Prop({
    required: true,
  })
  numOfSongs!: number;

  @Prop({})
  creationDate!: Date;
}

export const ListSchema = SchemaFactory.createForClass(List);
