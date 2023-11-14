import { Component, OnInit } from '@angular/core';
import { IUser } from '@indivproj-p2/shared/api';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'indivproj-p2-user-detail',
  templateUrl: './user-detail.component.html',
  styles: [],
})
export class UserDetail {
  userId: string | null = null;
  users: IUser | null = null;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    console.log('UserDetail.ngOnInit()');

    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id');

      this.userService.read(this.userId).subscribe((observable) => this.users = observable);
    });
  }
}
