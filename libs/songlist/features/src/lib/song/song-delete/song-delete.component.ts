import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SongService } from '../song.service';
import { ISong } from '@indivproj-p2/shared/api';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'indivproj-p2-song-delete',
  templateUrl: './song-delete.component.html',
  styleUrls: ['../../user/user-list/user-list.component.css'],
})
export class SongDeleteComponent implements OnInit {
  song = {} as ISong;
  id: string | null = null;

  constructor(
    private songService: SongService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.authService.currentUser$.value?.role === 'admin') {
        this.songService.read(this.id).subscribe((observable) => {
          this.song = observable;
        });
      }
    });
  }

  deleteSong(): void {
    if (!this.song) {
      console.error('Song information is missing.');
      return;
    }

    if (this.song.creatorId !== this.authService.currentUser$.value?.id) {
      this.router.navigate(['/list']);
    }

    this.songService.delete(this.song).subscribe(
      () => {
        this.router.navigate(['/list']);
      },
      (error) => {
        console.error('Error deleting song:', error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['../..'], { relativeTo: this.route });
  }
}
