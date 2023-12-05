import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { IArtist } from '@indivproj-p2/shared/api';
import { IsMongoId } from 'class-validator';

export type ArtistDocument = Artist & Document;

@Schema()
export class Artist implements IArtist {
  @IsMongoId()
  _id!: string;

  @Prop({
    required: true,
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
  age!: number;

  @Prop({
    required: true,
  })
  country!: string;
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
