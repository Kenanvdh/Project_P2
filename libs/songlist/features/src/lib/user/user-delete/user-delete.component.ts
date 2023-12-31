import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { UserService } from '../user.service';
import { IUser } from '@indivproj-p2/shared/api';
import { UserRole, Gender } from '@indivproj-p2/shared/api';
import { AuthService } from '../../auth/auth.service';

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
    password: '',
    age: 0,
    gender: Gender.male,
    role: UserRole.guest,
  };
  id: string | null = null;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    if(!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
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
          this.router.navigate(['/users']);
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
    this.router.navigate(['/users']);
  }
}
