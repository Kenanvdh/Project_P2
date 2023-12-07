import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import {
  ICreateArtist,
  IUpdateArtist,
  IUpsertArtist,
} from '@indivproj-p2/shared/api';

export class CreateArtistDto implements ICreateArtist {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNumber()
  @IsNotEmpty()
  age!: number;

  @IsString()
  @IsNotEmpty()
  country!: string;

  @IsString()
  @IsNotEmpty()
  creatorId!: string;

}

export class UpsertArtistDto implements IUpsertArtist {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNumber()
  @IsNotEmpty()
  age!: number;

  @IsString()
  @IsNotEmpty()
  country!: string;
  
  @IsString()
  @IsNotEmpty()
  creatorId!: string;
}

export class UpdateArtistDto implements IUpdateArtist {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNumber()
  @IsNotEmpty()
  age!: number;

  @IsString()
  @IsNotEmpty()
  country!: string;
  
  @IsString()
  @IsNotEmpty()
  creatorId!: string;
}
