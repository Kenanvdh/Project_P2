import { id }  from './id.type';

export interface Song {
  id: id;
  name: string;
  artist: string;
  album: string;
  year: number;
  genre: string;
  duration: number;
  url: string;
}
export type ICreateSong = Pick<Song, 'name' | 'artist' | 'album' | 'year' | 'genre' | 'duration' | 'url'>;