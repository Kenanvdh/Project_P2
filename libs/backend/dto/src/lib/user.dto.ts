import { IsNotEmpty, IsString, IsEmail, IsNumber } from 'class-validator';
import { ICreateUser, IUpsertUser, IUpdateUser } from '@indivproj-p2/shared/api';
import { UserRole, Gender} from 'libs/songlist/features/src/lib/user/user.model';

export class CreateUserDto implements ICreateUser {
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsNumber()
  @IsNotEmpty()
  age!: number;

  @IsString()
  @IsNotEmpty()
  gender!: Gender;

  @IsString()
  @IsNotEmpty()
  role!: UserRole;
}

export class UpsertUserDto implements IUpsertUser {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsNumber()
  @IsNotEmpty()
  age!: number;

  @IsString()
  @IsNotEmpty()
  gender!: Gender;

  @IsString()
  @IsNotEmpty()
  role!: UserRole;
}

export class UpdateUserDto implements IUpdateUser {
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;
  
  @IsNumber()
  @IsNotEmpty()
  age!: number;

  @IsString()
  @IsNotEmpty()
  gender!: Gender;
  
  @IsString()
  @IsNotEmpty()
  role!: UserRole;
}
