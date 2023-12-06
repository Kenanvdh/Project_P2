import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SongService } from '../song.service';
import { ISong, IArtist } from '@indivproj-p2/shared/api';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'indivproj-p2-song-delete',
  templateUrl: './song-delete.component.html',
  styleUrls: ['../../user/user-list/user-list.component.css'],
})
export class SongDeleteComponent {
  song: ISong = {
    id: '',
    name: '',
    album: '',
    artist: {} as IArtist,
    duration: 0,
    genre: '',
    year: 0,
    url: '',
  };
  id: string | null = null;

  constructor(
    private songService: SongService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if(!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        this.songService.read(this.id).subscribe((observable) => {
          this.song = observable;
        });
      }
    });
  }

  deleteSong(): void {
    if (this.id) {
      this.songService.delete(this.song).subscribe(
        () => {
          console.log('Song deleted successfully');
          this.router.navigate(['../..'], { relativeTo: this.route });
        },
        (error) => {
          console.error('Error deleting song:', error);
        }
      );
    } else {
      console.error('Song id is missing for deletion.');
    }
  }

  goBack(): void {
    this.router.navigate(['../..'], { relativeTo: this.route });
  }
}
