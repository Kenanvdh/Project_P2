import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { SongService } from '../song.service';
import { ISong } from '@indivproj-p2/shared/api';

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
    artist: '',
    duration: 0,
    genre: '',
    year: 0,
    url: '',
  };
  id: string | null = null;

  constructor(private songService: SongService, private route: ActivatedRoute, private router: Router, private location: Location) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if(this.id) {
        this.songService.read(this.id).subscribe((observable) => {this.song = observable});
      }
    });
  }

  editSong(): void {
    this.songService.update(this.song).subscribe(() => {
      this.router.navigate(['/songs']);
    });
  }

  createSong(): void {
    this.songService.create(this.song).subscribe(
      (createdSong) => {
        console.log('Song created successfully:', createdSong);
        this.router.navigate(['../..'], {relativeTo: this.route});

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

