import { Injectable, NotFoundException } from '@nestjs/common';
import { ISong } from '@indivproj-p2/shared/api'
import { BehaviorSubject } from 'rxjs';
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
            duration: 355,
            url: 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ',
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

    /**
     * Update the arg signature to match the DTO, but keep the
     * return signature - we still want to respond with the complete
     * object
     */
    create(song: Pick<ISong, 'name' | 'artist' | 'album' | 'year' | 'genre' | 'duration' | 'url'>): ISong {
        Logger.log('create', this.TAG);
        const current = this.songs$.value;
        // Use the incoming data, a randomized ID, and a default value of `false` to create the new to-do
        const newSong: ISong = {
            ...song,
            id: `song-${Math.floor(Math.random() * 10000)}`,
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
