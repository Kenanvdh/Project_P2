import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { SongService } from '../song.service';
import { ArtistService } from '../../artist/artist.service';
import { IArtist, ISong } from '@indivproj-p2/shared/api';

@Component({
  selector: '@indivproj-p2-song-create',
  templateUrl: './song-edit.component.html',
  styleUrls: ['../../user/user-list/user-list.component.css'],
})
export class SongEditComponent {
  song: ISong = {
    id: '',
    name: '',
    album: '',
    artist: {
      id: '',
      name: '',
      age: 0,
      country: '',
    },
    duration: 0,
    genre: '',
    year: 0,
    url: '',
  };
  songs: ISong[] | null = null;
  id: string | null = null;
  artists: IArtist[] = [];

  constructor(
    private songService: SongService,
    private artistService: ArtistService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        this.songService.read(this.id).subscribe((observable) => {
          this.song = observable;
        });
      }
    });
    this.artistService.list().subscribe((artists) => {
      this.artists = artists?.sort((a, b) => a.name.localeCompare(b.name)) ?? [];
    });
  }


  editSong(): void {
    this.songService.update(this.song).subscribe(() => {
      this.router.navigate(['/songs']);
    });
  }
  
  createSong(): void {
    const selectedArtistId = this.song.artist.id;
    const selectedArtist = this.artists?.find(
      (artist) => artist.id === selectedArtistId
    );

    if (selectedArtist) {
      this.song.artist = selectedArtist;
    } else {
      console.error('Selected artist not found.');
      return;
    }

    console.log('Song before creation:', this.song); // Log the song object just before the creation
    this.songService.create(this.song).subscribe(
      (createdSong) => {
        console.log('Song created successfully:', createdSong);
        this.router.navigate(['../..'], { relativeTo: this.route });
      },
      (error) => {
        console.error('Error creating song:', error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/songs']);
  }
}
