import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsOptional,
  IsDate,
} from 'class-validator';
import {
  ICreateUser,
  IUpsertUser,
  IUpdateUser,
  UserSort,
} from '../../../../shared/api/src/lib/models/user.interface';
import { UserRole } from 'libs/songlist/features/src/lib/user/user.model';

/**
 * Use the Pick utility type to extract only the properties we want for
 * new to-do items
 */
export class CreateUserDto implements ICreateUser {
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsString()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  role!: UserRole;
}

export class UpsertUserDto implements IUpsertUser {
  @IsString()
  @IsNotEmpty()
  id!: number;
  
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;


  @IsBoolean()
  @IsNotEmpty()
  email!: string;

  @IsDate()
  @IsNotEmpty()
  role!: UserRole;

}

export class UpdateUserDto implements IUpdateUser {
  @IsString()
  @IsOptional()
  firstName!: string;

  @IsString()
  @IsOptional()
  lastName!: string;

  @IsBoolean()
  @IsOptional()
  email!: string;
}
