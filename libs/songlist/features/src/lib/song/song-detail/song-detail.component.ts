import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IArtist, ISong } from '@indivproj-p2/shared/api';
import { SongService } from '../song.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'indivproj-p2-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['../../user/user-list/user-list.component.css'],
})
export class SongDetailComponent {
  songId: string | null = null;
  song = {} as ISong;
  artist = {} as IArtist | null;
  showButton: boolean | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private songService: SongService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    console.log('UserDetail.ngOnInit()');
    this.songId = this.route.snapshot.paramMap.get('id');

    this.songService.read(this.songId).subscribe((song) => {
      (this.song = song), (this.showButton = this.isCurrentCreator());
    });
  }

  isCurrentCreator(): boolean {
    const creatorId = this.song?.creatorId;
    return this.authService.currentUser$.value?.id === creatorId;
  }

  goBack(): void {
    this.router.navigate(['../..'], { relativeTo: this.route });
  }
}
