import { Component } from '@angular/core';
import { IList, IUser, ISong } from '@indivproj-p2/shared/api';
import { ListService } from '../list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'indivproj-p2-list-delete',
  templateUrl: './list-delete.component.html',
  styleUrls: ['../../user/user-list/user-list.component.css'],
})

export class ListDeleteComponent {
  list: IList = {
    id: '',
    name: '',
    description: '',
    creator: {} as IUser,
    numOfSongs: 0,
    songs: [] as ISong[],
    creationDate: new Date(),
  };
  id: string | null = null;

  constructor(
    private listService: ListService,
    private authService: AuthService, 
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if(!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        this.listService.read(this.id).subscribe((observable) => {
          this.list = observable;
        });
      }
    });
  }

  deleteList(): void {
    if (this.id) {
      this.listService.delete(this.list).subscribe(
        () => {
          console.log('List deleted successfully');
          this.router.navigate(['../..'], { relativeTo: this.route });
        },
        (error) => {
          console.error('Error deleting list:', error);
        }
      );
    } else {
      console.error('List id is missing for deletion.');
    }
  }

  goBack(): void {
    this.router.navigate(['../..'], { relativeTo: this.route });
  }
}
