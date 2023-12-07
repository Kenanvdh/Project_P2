import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../../auth/auth.service';

import { UserService } from '../user.service';
import { IUser } from '@indivproj-p2/shared/api';
import { UserRole, Gender } from '@indivproj-p2/shared/api';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./../user-list/user-list.component.css'],
})

export class UserEditComponent {
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

  constructor(private userService: UserService,  private authService: AuthService, private route: ActivatedRoute, private router: Router, private location: Location) {}

  ngOnInit(): void {
    if(!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if(this.id) {
        this.userService.read(this.id).subscribe((observable) => {this.user = observable});
      }
    });
  }

  editUser(): void {
    this.userService.update(this.user).subscribe(() => {
      this.router.navigate(['/users']);
    });
  }

  createUser(): void {
    this.userService.create(this.user).subscribe(
      (createdUser) => {
        console.log('User created successfully:', createdUser);
        this.router.navigate(['/users'], {relativeTo: this.route});

      },
      (error) => {
        console.error('Error creating user:', error);
      }
    );
  } 

  checkValidAge(): boolean {
    return this.user.age >= 1;
  }

  goBack(): void {
    this.router.navigate(['/users']);
  }
}
