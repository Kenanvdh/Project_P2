import { id } from './id.type';

type Artist = string;

export interface IArtist {
  id: id;
  name: string;
  age: number;
  country: string;
  creatorId: string;
}

export interface ICreateArtist {
  id: id;
  name: string;
  age: number;
  country: string;
  creatorId: string;
}
export interface IUpsertArtist {
  id: id;
  name: string;
  age: number;
  country: string;
  creatorId: string;
}
export interface IUpdateArtist {
  name: string;
  age: number;
  country: string;
  creatorId: string;
}
