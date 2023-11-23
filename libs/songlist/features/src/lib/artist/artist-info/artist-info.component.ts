import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArtistService } from '../artist.service';
import { IArtist } from '@indivproj-p2/shared/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'indivproj-p2-artist-info',
  templateUrl: './artist-info.component.html',
  styleUrls: ['../../song/song-list/song-list.component.css'],
})
export class ArtistInfoComponent implements OnInit, OnDestroy {
  artist: IArtist | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(private artistService: ArtistService) {}

  ngOnInit(): void {
    this.subscription = this.artistService.read().subscribe(
      (result) => {
        console.log(`result: `, result);
        this.artist = result; 
      },
      (error) => {
        console.error('Error fetching artist:', error);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
