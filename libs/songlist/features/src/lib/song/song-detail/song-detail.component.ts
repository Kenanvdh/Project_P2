import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ISong } from '@indivproj-p2/shared/api';
import { SongService } from '../song.service';

@Component({
  selector: 'indivproj-p2-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['../../user/user-list/user-list.component.css'],
})
export class SongDetailComponent {
  songId: string | null = null;
  songs: ISong | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private songService: SongService
  ) {}

  ngOnInit(): void {
    console.log('UserDetail.ngOnInit()');

    this.route.paramMap.subscribe((params) => {
      this.songId = params.get('id');

      this.songService
        .read(this.songId)
        .subscribe((observable) => (this.songs = observable));
    });
  }

  goBack(): void {
    this.router.navigate(['../..'], { relativeTo: this.route });
  }
}
