import {
    IsNotEmpty,
    IsString,
    IsNumber
} from 'class-validator';
import {
    ICreateSong,
    IUpdateSong,
    IUpsertSong,
    IDeleteSong, 
} from '@indivproj-p2/shared/api';

/**
 * Use the `Pick` utility type to extract only the properties we want for
 * new to-do items
 */
 export class CreateSongDto implements ICreateSong {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    artist!: string;

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
    id!: number;
    
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    artist!: string;

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
    artist!: string;

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
