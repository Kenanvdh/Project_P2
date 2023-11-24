import {
    IsNotEmpty,
    IsString,
    IsNumber
} from 'class-validator';
import {
    ICreateSong,
    IUpdateSong,
    IUpsertSong,
    IArtist
} from '@indivproj-p2/shared/api';

 export class CreateSongDto implements ICreateSong {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    artistId!: string;

    @IsString()
    @IsNotEmpty()
    artist!: IArtist;

    @IsString()
    @IsNotEmpty()
    album!: string;

    @IsNumber()
    @IsNotEmpty()
    year!: number;

    @IsString()
    @IsNotEmpty()
    genre!: string;
    
    @IsNumber()
    @IsNotEmpty()
    duration!: number;
    
    @IsString()
    @IsNotEmpty()
    url!: string;
}

export class UpsertSongDto implements IUpsertSong {
    @IsString()
    @IsNotEmpty()
    id!: string;
    
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    artistId!: string;
    
    @IsString()
    @IsNotEmpty()
    artist!: IArtist;

    @IsString()
    @IsNotEmpty()
    album!: string;

    @IsNumber()
    @IsNotEmpty()
    year!: number;

    @IsString()
    @IsNotEmpty()
    genre!: string;
    
    @IsNumber()
    @IsNotEmpty()
    duration!: number;
    
    @IsString()
    @IsNotEmpty()
    url!: string;
}

export class UpdateSongDto implements IUpdateSong {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    artistId!: string;

    @IsString()
    @IsNotEmpty()
    artist!: IArtist;

    @IsString()
    @IsNotEmpty()
    album!: string;

    @IsNumber()
    @IsNotEmpty()
    year!: number;

    @IsString()
    @IsNotEmpty()
    genre!: string;
    
    @IsNumber()
    @IsNotEmpty()
    duration!: number;
    
    @IsString()
    @IsNotEmpty()
    url!: string;
}
