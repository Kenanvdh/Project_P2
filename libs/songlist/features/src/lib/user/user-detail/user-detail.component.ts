import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IUser } from '@indivproj-p2/shared/api';
import { UserService } from '../user.service';

@Component({
  selector: 'indivproj-p2-user-detail',
  template: './user-detail.component.html',
  styles: [],
})
export class UserDetail implements OnInit {
  users$?: Observable<IUser[]>;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    console.log('UserDetail.ngOnInit()');
    this.users$ = this.userService
      .getUsersAsObservable()
      .pipe(tap(console.log));
  }
}
