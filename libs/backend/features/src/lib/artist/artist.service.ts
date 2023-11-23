import { Injectable, NotFoundException } from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';
import { IArtist } from '@indivproj-p2/shared/api';

@Injectable()
export class ArtistService {
  TAG = 'ArtistService';

  private artists$ = new BehaviorSubject<IArtist[]>([
    {
      id: '0',
      name: 'Queen',
      age: 50,
      country: 'England',
    },
    {
      id: '1',
      name: 'Michael Jackson',
      age: 50,
      country: 'USA',
    },
    {
      id: '2',
      name: 'Davina Michelle',
      age: 25,
      country: 'Netherlands',
    },
    {
      id: '3',
      name: 'Nickelback',
      age: 39,
      country: 'Canada',
    },
    {
      id: '4',
      name: 'Vance Joy',
      age: 33,
      country: 'Australia',
    },
    {
      id: '5',
      name: 'The Beatles',
      age: 60,
      country: 'England',
    },
    {
      id: '6',
      name: 'The Rolling Stones',
      age: 50,
      country: 'England',
    },
    {
      id: '7',
      name: 'Nielson',
      age: 28,
      country: 'Netherlands',
    },
    {
      id: '8',
      name: 'The Script',
      age: 47,
      country: 'Ireland',
    },
    {
      id: '9',
      name: 'The Weeknd',
      age: 25,
      country: 'Canada',
    }    
  ]);

  getAll(): IArtist[] {
    console.log(`Fetching all artists`);
    return this.artists$.value;
  }

  getById(id: string): IArtist {
    console.log(`Fetching artist with ID: ${id}`);
    const artist = this.artists$.value.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException(`Artist could not be found!`);
    }
    return artist;
  }
}
