import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { IUser } from '@indivproj-p2/shared/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'indivproj-p2-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: [],
})
export class UserListComponent implements OnInit, OnDestroy {
  users: IUser[] = [];
  subscription?: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    console.log('UserList.ngOnInit()');
    this.subscription = this.userService
      .getUsersAsObservable()
      .subscribe((users) => (this.users = users));
  }

  ngOnDestroy() {
    console.log('UserList.ngOnDestroy()');
    this.subscription?.unsubscribe();
  }
}
