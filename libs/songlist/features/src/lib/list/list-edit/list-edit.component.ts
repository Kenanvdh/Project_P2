import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListService } from '../list.service';
import { SongService } from '../../song/song.service';
import { IList, ISong } from '@indivproj-p2/shared/api';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'indivproj-p2-list-edit',
  templateUrl: './list-edit.component.html',
  styleUrls: ['../../user/user-list/user-list.component.css'],
})
export class ListEditComponent implements OnInit {
  list = {} as IList;
  songs: ISong[] = [];
  selectedSongIds: string[] = [];

  constructor(
    private listService: ListService,
    private songService: SongService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.listService.read(id).subscribe((list) => {
        this.list = list;
        this.selectedSongIds = list.songs.map((song) => song.id);
      });
    }
    this.songService.list().subscribe((songs) => {
      if (songs) this.songs = songs;
    });
  }

  toggleSelection(songId: string): void {
    const index = this.selectedSongIds.indexOf(songId);
    if (index !== -1) {
      this.selectedSongIds.splice(index, 1);
    } else {
      this.selectedSongIds.push(songId);
    }
  }

  isSelected(songId: string): boolean {
    return this.selectedSongIds.includes(songId);
  }

  editList(): void {
    this.list.songs = this.songs.filter((song) =>
      this.selectedSongIds.includes(song.id)
    );
    this.listService.update(this.list).subscribe(
      (updatedList) => {
        console.log('List updated successfully:', updatedList);
        this.router.navigate(['/lists']);
      },
      (error) => {
        console.error('Error updating list:', error);
      }
    );
  }

  createList(): void {
    this.list.songs = this.songs.filter((song) =>
      this.selectedSongIds.includes(song.id)
    );

    if (this.authService.currentUser$.value?.id) {
      this.list.creatorId = this.authService.currentUser$.value?.id;
    }
    console.log('creator:', this.list.creatorId);

    this.listService.create(this.list).subscribe(
      (newList) => {
        console.log('List created successfully:', newList);
        this.router.navigate(['/lists']);
      },
      (error) => {
        console.error('Error creating list:', error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/lists']);
  }
}
