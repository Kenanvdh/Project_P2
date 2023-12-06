import { UserRole, Gender} from './user.model';
import { id } from './id.type';

type User = string;

export interface IUser {
    id: id;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    age: number;
    gender: Gender;
    role: UserRole;
    token?: string;
}

export type ICreateUser = Pick<
IUser,
    'firstName' | 'lastName' | 'email' | 'role'
>;

export type IUpdateUser = Partial<Omit<IUser, 'id'>>;
export type IUpsertUser = IUser;