import { id }  from './id.type';
import { IArtist } from './artist.interface';
import { IUser } from './user.interface';

type Song = string;

export interface ISong {
  id: id;
  name: string;
  artist: IArtist;
  album: string;
  year: number;
  genre: string;
  duration: number;
  url: string;
  creator: IUser;
}
export type ICreateSong = Pick<ISong, 'name'  | 'artist' | 'album' | 'year' | 'genre' | 'duration' | 'url'>;
export type IUpdateSong = Partial<Omit<ISong,id>>;
export type IUpsertSong = ISong;
