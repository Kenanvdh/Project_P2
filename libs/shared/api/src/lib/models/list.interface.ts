import { id }  from './id.type';
import { ISong } from './song.interface';

type List = string;

export interface IList {
  id: id;
  name: string;
  creatorId: string;
  description: string;
  numOfSongs: number;
  songs: ISong[];
  creationDate: Date;
}
export type ICreateList = Pick<IList, 'name'  | 'creatorId' | 'description' | 'numOfSongs' | 'creationDate'>;
export type IUpdateList = Partial<Omit<IList,id>>;
export type IUpsertList = IList;
