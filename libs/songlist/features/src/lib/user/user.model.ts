export enum UserRole {
    admin = 'admin',
    editor = 'editor',
    guest = 'guest',
  }
  
  export class User {
    id: string = '';
    firstName: string = '';
    lastName: string = '';
    email: string = '';
    role: UserRole = UserRole.guest;
  
    constructor(firstName = '', lastName = '', email = '') {
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
    }
  }