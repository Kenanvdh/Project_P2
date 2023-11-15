import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { IUser } from '@indivproj-p2/shared/api';
import { Subscription } from 'rxjs';

@Component({
  selector: '@indivproj-p2/user-list',
  templateUrl: './user-list.component.html',
  styles: [],
})

export class ListComponent implements OnInit, OnDestroy {
  userId: string | null = null;
  users: IUser[] | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.subscription = this.userService.list().subscribe((results) => this.users = results);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
