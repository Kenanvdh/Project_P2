import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistService } from '../artist.service';
import { IArtist } from '@indivproj-p2/shared/api';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: '@indivproj-p2-artist-create',
  templateUrl: './artist-edit.component.html',
  styleUrls: ['../../user/user-list/user-list.component.css'],
})
export class ArtistEditComponent {
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

  editArtist(): void {
    this.artistService.update(this.artist).subscribe(
      (updatedArtist) => {
        console.log('Artist updated successfully:', updatedArtist);
        this.router.navigate(['list'], { relativeTo: this.route });
      },
      (error) => {
        console.error('Error updating artist:', error);
      }
    );
  }
  
  createArtist(): void {
    this.artistService.create(this.artist).subscribe(
      (createdArtist) => {
        console.log('Artist created successfully:', createdArtist);
        this.router.navigate(['list'], { relativeTo: this.route });
      },
      (error) => {
        console.error('Error creating artist:', error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/list']);
  }
}
