import { Injectable } from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';
import { UserRole } from '../../../../../songlist/features/src/lib/user/user.model';
import { IUser } from '@indivproj-p2/shared/api';

@Injectable()
export class UserService {
  private users$ = new BehaviorSubject<IUser[]>([
    {
      id: "0",
      firstName: 'Kenan',
      lastName: 'van der Heijden',
      email: 'kenanvdh@host.com',
      role: UserRole.admin,
    },
    {
      id: "1",
      firstName: 'Piet',
      lastName: 'Jansen',
      email: 'pj123@host.com',
      role: UserRole.guest,
    },
    {
      id: "2",
      firstName: 'Riet',
      lastName: 'van den Bomen',
      email: 'rvdb@host.com',
      role: UserRole.editor,
    },
  ]);

  constructor() {
    console.log('Service constructor aangeroepen');
  }

  getUsers(): IUser[] {
    console.log('getUsers aangeroepen');
    return this.users$.value;
  }

  getUserById(id: string): IUser {
    console.log('getUserById aangeroepen');
    const user = this.users$.value.find((td) => td.id == id);
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return user;
  }
}
