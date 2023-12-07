import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IArtist } from '@indivproj-p2/shared/api';
import { ArtistService } from '../artist.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'indivproj-p2-artist-info',
  templateUrl: './artist-info.component.html',
  styleUrls: ['../../user/user-list/user-list.component.css'],
})
export class ArtistInfoComponent {
  artistId: string | null = null;
  artist: IArtist | null = null;
  showButton: boolean | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private artistService: ArtistService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.artistId = this.route.snapshot.paramMap.get('id');
    this.artistService
      .read(this.artistId)
      .subscribe((artist) => (this.artist = artist, this.showButton = this.isCurrentCreator()));
  }

  isCurrentCreator(): boolean {
    const creatorId = this.artist?.creatorId;
    return this.authService.currentUser$.value?.id === creatorId;
  }

  goBack(): void {
    this.router.navigate(['../..'], { relativeTo: this.route });
  }
}
