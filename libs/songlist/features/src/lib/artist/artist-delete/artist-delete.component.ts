import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistService } from '../artist.service';
import { IArtist } from '@indivproj-p2/shared/api';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'indivproj-p2-artist-delete',
  templateUrl: './artist-delete.component.html',
  styleUrls: ['../../user/user-list/user-list.component.css'],
})
export class ArtistDeleteComponent {
  artist = {} as IArtist;
  id: string | null = null;
  
  constructor(
    private artistService: ArtistService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if(!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        this.artistService.read(this.id).subscribe((observable) => {
          this.artist = observable;
        });
      }
    });
  }

  deleteArtist(): void {
    if (this.id) {
      this.artistService.delete(this.artist).subscribe(
        () => {
          console.log('Artist deleted successfully');
          this.router.navigate([`../../..`], { relativeTo: this.route });
        },
        (error) => {
          console.error('Error deleting artist:', error);
        }
      );
    } else {
      console.error('Artist id is missing for deletion.');
    }
  }

  goBack(): void {
    this.router.navigate([''], { relativeTo: this.route });
  }
}
