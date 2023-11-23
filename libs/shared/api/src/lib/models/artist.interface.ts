import { id } from './id.type';

type Artist = string;

export interface IArtist {
  id: id;
  name: string;
  age: number;
  country: string;
}
