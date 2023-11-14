import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User, UserRole } from '../user/user.model';
import { IUser } from '../../../../../shared/api/src/lib/models/user.interface';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly users: IUser[] = [
    {
      id: 0,
      firstName: 'Eerste',
      lastName: 'User',
      email: 'usereen@host.com',
      role: UserRole.admin,
    },
    {
      id: 1,
      firstName: 'Tweede',
      lastName: 'User',
      email: 'usertwee@host.com',
      role: UserRole.guest,
    },
    {
      id: 2,
      firstName: 'Derde',
      lastName: 'User',
      email: 'userdrie@host.com',
      role: UserRole.editor,
    },
  ];

  constructor() {
    console.log('Service constructor aangeroepen');
  }

  getUsers(): IUser[] {
    console.log('getUsers aangeroepen');
    return this.users;
  }

  getUsersAsObservable(): Observable<IUser[]> {
    console.log('getUsersAsObservable aangeroepen');
    return of(this.users);
  }

  getUserById(id: number): IUser {
    console.log('getUserById aangeroepen');
    return this.users.filter((user) => user.id === id)[0];
  }
}
