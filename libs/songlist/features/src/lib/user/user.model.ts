export enum UserRole {
  admin = 'admin',
  editor = 'editor',
  guest = 'guest',
}

export enum Gender {
  male = 'Male',
  female = 'Female',
  other = 'Other',
}

export class User {
  id: string = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  age: number = 0;
  gender: Gender = Gender.male;
  role: UserRole = UserRole.guest;
  token: string | null = null;

  constructor(firstName = '', lastName = '', email = '') {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
}
