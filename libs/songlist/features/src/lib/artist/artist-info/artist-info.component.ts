import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IArtist } from '@indivproj-p2/shared/api';
import { ArtistService } from '../artist.service';

@Component({
  selector: 'indivproj-p2-artist-info',
  templateUrl: './artist-info.component.html',
  styleUrls: ['../../user/user-list/user-list.component.css'],
})
export class ArtistInfoComponent {
  artistId: string | null = null;
  artist: IArtist | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private artistService: ArtistService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.artistId = params.get('id');

      this.artistService
        .read(this.artistId)
        .subscribe((observable) => (this.artist = observable));
    });
  }

  goBack(): void {
    this.router.navigate(['../..'], { relativeTo: this.route });
  }
}
