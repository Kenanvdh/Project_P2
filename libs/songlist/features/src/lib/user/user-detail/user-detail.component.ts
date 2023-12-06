import { Component, OnInit } from '@angular/core';
import { IUser } from '@indivproj-p2/shared/api';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'indivproj-p2-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['../user-list/user-list.component.css'],
})

export class UserDetail {
  userId: string | null = null;
  users: IUser | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    if(!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
    console.log('UserDetail.ngOnInit()');

    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id');

      this.userService.read(this.userId).subscribe((observable) => this.users = observable);
    });
  }
}
