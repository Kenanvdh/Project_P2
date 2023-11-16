import { Injectable } from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';
import { UserRole } from '../../../../../songlist/features/src/lib/user/user.model';
import { IUser } from '@indivproj-p2/shared/api';

@Injectable()
export class UserService {
  private users$ = new BehaviorSubject<IUser[]>([
    {
      id: '0',
      firstName: 'Kenan',
      lastName: 'van der Heijden',
      email: 'kenanvdh@host.com',
      role: UserRole.admin,
    },
    {
      id: '1',
      firstName: 'Piet',
      lastName: 'Jansen',
      email: 'pj123@host.com',
      role: UserRole.guest,
    },
    {
      id: '2',
      firstName: 'Riet',
      lastName: 'van den Bomen',
      email: 'rvdb@host.com',
      role: UserRole.editor,
    },
  ]);

  constructor() {
    console.log('Service constructor called');
  }

  getUsers(): IUser[] {
    console.log('getUsers called');
    return this.users$.value;
  }

  getUserById(id: string): IUser {
    console.log('getUserById called');
    const user = this.users$.value.find((td) => td.id == id);
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return user;
  }

  createUser(user: IUser): IUser {
    this.users$.next([...this.users$.value, user]);
    return user;
  }

  editUser(user: IUser): IUser {
    const index = this.users$.value.findIndex((td) => td.id == user.id);
    if (index == -1) {
      throw new Error(`User with id ${user.id} not found`);
    }
    this.users$.value[index] = user;
    return this.users$.value[index];
  }
}
