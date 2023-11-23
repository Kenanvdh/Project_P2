import { Injectable } from '@nestjs/common';
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
      age: 50,
      country: 'Canada',
    },
    {
      id: '4',
      name: 'Vance Joy',
      age: 33,
      country: 'Australia',
    },
  ]);

  get(): IArtist[] {
    return this.artists$.value;
  }
}
