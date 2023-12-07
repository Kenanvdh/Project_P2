import {
    IsNotEmpty,
    IsString,
    IsNumber
} from 'class-validator';
import {
    ICreateList,
    ISong,
    IUpdateList,
    IUpsertList,
    IUser,
} from '@indivproj-p2/shared/api';

 export class CreateListDto implements ICreateList {
    @IsString()
    @IsNotEmpty()
    id!: string;

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsString()
    @IsNotEmpty()
    creatorId!: string;

    @IsNumber()
    @IsNotEmpty()
    numOfSongs!: number;

    @IsString()
    @IsNotEmpty()
    songs!: ISong[];

    @IsString()
    @IsNotEmpty()
    creationDate!: Date;
}

export class UpsertListDto implements IUpsertList {
    @IsString()
    @IsNotEmpty()
    id!: string;
    
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsString()
    @IsNotEmpty()
    creatorId!: string;

    @IsNumber()
    @IsNotEmpty()
    numOfSongs!: number;

    @IsString()
    @IsNotEmpty()
    songs!: ISong[];

    @IsString()
    @IsNotEmpty()
    creationDate!: Date;
}

export class UpdateListDto implements IUpdateList {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsString()
    @IsNotEmpty()
    creator!: IUser;

    @IsNumber()
    @IsNotEmpty()
    numOfSongs!: number;

    @IsString()
    @IsNotEmpty()
    songs!: ISong[];
    
    @IsString()
    @IsNotEmpty()
    creationDate!: Date;
}
