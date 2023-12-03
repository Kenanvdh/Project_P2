import { id }  from './id.type';
import { IUser } from './user.interface';

type List = string;

export interface IList {
  id: id;
  name: string;
  creator: IUser;
  description: string;
  numOfSongs: number;
  creationDate: Date;
}
export type ICreateList = Pick<IList, 'name'  | 'creator' | 'description' | 'numOfSongs' | 'creationDate'>;
export type IUpdateList = Partial<Omit<IList,id>>;
export type IUpsertList = IList;
