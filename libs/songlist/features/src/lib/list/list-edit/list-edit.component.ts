import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListService } from '../list.service';
import { SongService } from '../../song/song.service';
import { IList, ISong, IUser } from '@indivproj-p2/shared/api';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'indivproj-p2-list-edit',
  templateUrl: './list-edit.component.html',
  styleUrls: ['../../user/user-list/user-list.component.css'],
})
export class ListEditComponent implements OnInit {
  list: IList = {
    id: '',
    name: '',
    songs: [],
    creator: {} as IUser,
    description: '',
    numOfSongs: 0,
    creationDate: new Date(),
  };
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

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (
        this.list.creator.id === this.authService.currentUser$.value?.id ||
        this.authService.currentUser$.value?.role === 'admin'
      ) {
        this.listService.read(id).subscribe((list) => {
          this.list = { ...list, songs: list.songs || [] };
          this.selectedSongIds = this.list.songs.map((song) => song.id);
        });

        this.songService.list().subscribe((songs) => {
          this.songs = songs || [];
        });
      } else{
        this.router.navigate(['/lists']);
      }
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
    this.listService.create(this.list).subscribe(
      (createdList) => {
        console.log('List created successfully:', createdList);
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
