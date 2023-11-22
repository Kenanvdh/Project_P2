import { Injectable } from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';
import { UserRole, Gender } from '../../../../../songlist/features/src/lib/user/user.model';
import { IUser } from '@indivproj-p2/shared/api';

@Injectable()
export class UserService {
  private users$ = new BehaviorSubject<IUser[]>([
    {
      id: '0',
      firstName: 'Kenan',
      lastName: 'van der Heijden',
      email: 'kenanvdh@host.com',
      password: 'Welkom01!',
      age: 18,
      gender: Gender.male,
      role: UserRole.admin,
    },
    {
      id: '1',
      firstName: 'Piet',
      lastName: 'Jansen',
      email: 'pj123@host.com',
      password: 'Welkom02!',
      age: 40,
      gender: Gender.other,
      role: UserRole.guest,
    },
    {
      id: '2',
      firstName: 'Riet',
      lastName: 'van den Bomen',
      email: 'rvdb@host.com',
      password: 'Welkom03!',
      age: 55,
      gender: Gender.female,
      role: UserRole.editor,
    },
    {
      id: '3',
      firstName: 'Bart',
      lastName: 'van Graaf',
      email: 'bvg@hotmail.com',
      password: 'Welkom04!',
      age: 33,
      gender: Gender.other,
      role: UserRole.guest,
    },
    {
      id: '4',
      firstName: 'Beau',
      lastName: 'van Overste',
      email: 'bvo@ziggo.nl',
      password: 'Welkom05!',
      age: 19,
      gender: Gender.female,
      role: UserRole.admin,
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
    const nextId = String(this.users$.value.length);
    const newUser = { ...user, id: nextId };

    this.users$.next([...this.users$.value, newUser]);

    return newUser;
  }

  editUser(user: IUser): IUser {
    const index = this.users$.value.findIndex((td) => td.id == user.id);
    if (index == -1) {
      throw new Error(`User with id ${user.id} not found`);
    }

    this.users$.value[index] = { ...this.users$.value[index], ...user };

    return this.users$.value[index];
  }

  deleteUser(id: string): void {
    const index = this.users$.value.findIndex((td) => td.id == id);
    if (index == -1) {
      throw new Error(`User with id ${id} not found`);
    }

    this.users$.next([
      ...this.users$.value.slice(0, index),
      ...this.users$.value.slice(index + 1),
    ]);
  }
}
