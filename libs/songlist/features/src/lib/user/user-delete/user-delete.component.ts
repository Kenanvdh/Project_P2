import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { UserService } from '../user.service';
import { IUser } from '@indivproj-p2/shared/api';
import { UserRole } from '../user.model';

@Component({
  selector: 'indivproj-p2-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['../user-list/user-list.component.css'],
})
export class UserDeleteComponent {
  user: IUser = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    role: UserRole.guest,
  };
  id: string | null = null;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        this.userService.read(this.id).subscribe((observable) => {
          this.user = observable;
        });
      }
    });
  }

  deleteUser(): void {
    if (this.id) {
      this.userService.delete(this.user).subscribe(
        () => {
          console.log('User deleted successfully');
          this.router.navigate(['/user-list']);
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    } else {
      console.error('User id is missing for deletion.');
    }
  }

  goBack(): void {
    this.router.navigate(['/user-list']);
  }
}
