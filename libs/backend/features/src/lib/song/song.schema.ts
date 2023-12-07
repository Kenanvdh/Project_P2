import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ISong, IUser } from '@indivproj-p2/shared/api';
import { IsMongoId } from 'class-validator';
import { Artist } from '../artist/artist.schema';

export type SongDocument = Song & Document;

@Schema()
export class Song implements ISong {
  @IsMongoId()
  _id!: string;

  @Prop({
    unique: true,
  })
  id!: string;

  @Prop({
    required: true,
  })
  name!: string;

  @Prop({
    required: true,
  })
  album!: string;

  @Prop({
    required: true,
  })
  genre!: string;

  @Prop({
    required: true,
  })
  year!: number;

  @Prop({
    required: true,
    type: Artist,
    ref: 'Artist',
    unique: false,
  })
  artist!: Artist;

  @Prop({
    required: true,
  })
  duration!: number;

  @Prop({
    required: true,
  })
  url!: string;

  @Prop({
    required: true,
  })
  creatorId!: string;
}

export const SongSchema = SchemaFactory.createForClass(Song);
