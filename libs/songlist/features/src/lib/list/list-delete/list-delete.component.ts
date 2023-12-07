import { Component, OnInit } from '@angular/core';
import { IList } from '@indivproj-p2/shared/api';
import { ListService } from '../list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'indivproj-p2-list-delete',
  templateUrl: './list-delete.component.html',
  styleUrls: ['../../user/user-list/user-list.component.css'],
})
export class ListDeleteComponent implements OnInit {
  list: IList | null = null;

  constructor(
    private listService: ListService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.listService.read(id).subscribe(
        (list) => {
          // Check if the user has the correct permissions
          if (
            list.creatorId !== this.authService.currentUser$.value?.id &&
            this.authService.currentUser$.value?.role !== 'admin'
          ) {
            this.router.navigate(['/lists']);
          } else {
            this.list = list;
          }
        },
        (error) => {
          console.error('Error retrieving list:', error);
          this.router.navigate(['/lists']);
        }
      );
    } else {
      console.error('List id is missing.');
      this.router.navigate(['/lists']);
    }
  }

  deleteList(): void {
    if (!this.list) {
      console.error('List information is missing.');
      return;
    }

    if (this.list.creatorId !== this.authService.currentUser$.value?.id) {
      this.router.navigate(['/lists']);
      return;
    }

    this.listService.delete(this.list).subscribe(
      () => {
        console.log('List deleted successfully');
        this.router.navigate(['../..'], { relativeTo: this.route });
      },
      (error) => {
        console.error('Error deleting list:', error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['../..'], { relativeTo: this.route });
  }
}
