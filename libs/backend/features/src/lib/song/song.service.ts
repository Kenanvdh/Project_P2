import { Injectable, NotFoundException } from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';
import { ISong } from '@indivproj-p2/shared/api';
import { Logger } from '@nestjs/common';

@Injectable()
export class SongService {
  TAG = 'SongService';

  private songs$ = new BehaviorSubject<ISong[]>([
    {
      id: '0',
      name: 'Bohemian Rhapsody',
      artist: 'Queen',
      album: 'Bohemian Rhapsody',
      year: 2004,
      genre: 'Rock',
      duration: 5.54,
      url: 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ',
    },
    {
      id: '1',
      name: 'Beat it',
      artist: 'Micahel Jackson',
      album: 'Thriller',
      year: 1982,
      genre: 'Pop',
      duration: 4.17,
      url: 'https://www.youtube.com/watch?v=oRdxUFDoQe0',
    },
    {
      id: '2',
      name: 'Missen zou',
      artist: 'Thomas Acda',
      album: '',
      year: 2022,
      genre: 'NederPop',
      duration: 2.47,
      url: 'https://youtube.com/watch?v=P1yD-dxngy0',
    },
    {
      id: '3',
      name: 'How you remind me',
      artist: 'Nickelback',
      album: 'Silver side up',
      year: 2001,
      genre: 'Rock',
      duration: 3.43,
      url: 'https://www.youtube.com/watch?v=1cQh1ccqu8M',
    },
    {
      id: '4',
      name: 'Riptide',
      artist: 'Vance Joy',
      album: 'Dream your life away',
      year: 2014,
      genre: 'Folk',
      duration: 3.24,
      url: 'https://www.youtube.com/watch?v=uJ_1HMAGb4k',
    },
  ]);

  getAll(): ISong[] {
    Logger.log('getAll', this.TAG);
    return this.songs$.value;
  }

  getOne(id: string): ISong {
    Logger.log(`getOne(${id})`, this.TAG);
    const song = this.songs$.value.find((td) => td.id === id);
    if (!song) {
      throw new NotFoundException(`Song could not be found!`);
    }
    return song;
  }

  create(
    song: Pick<
      ISong,
      'name' | 'artist' | 'album' | 'year' | 'genre' | 'duration' | 'url'
    >
  ): ISong {
    Logger.log('create', this.TAG);
    const current = this.songs$.value;
    const newSong: ISong = {
      ...song,
      id: `${current.length + 1}`,
      name: 'Bohemian Rhapsody',
      artist: 'Queen',
      album: 'Bohemian Rhapsody',
      year: 2004,
      genre: 'Rock',
      duration: 355,
      url: 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ',
    };
    this.songs$.next([...current, newSong]);
    return newSong;
  }
}
