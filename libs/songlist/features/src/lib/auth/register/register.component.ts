import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '@indivproj-p2/backend/features';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../user/user-list/user-list.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      this.validEmail.bind(this),
    ]),
    password: new FormControl(null, [
      Validators.required,
      this.validPassword.bind(this),
    ]),
  });;
  subs: Subscription | null = null;

  constructor(private authService: AuthService, private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstname: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [
        Validators.required,
        this.validEmail.bind(this),
      ]),
      password: new FormControl(null, [
        Validators.required,
        this.validPassword.bind(this),
      ]),
    });
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  onSubmit(): void {
    if (this.registerForm?.valid) {
      this.authService.register(this.registerForm.value).subscribe(
        (user) => {
          console.log('user = ', user);
          if (!user) {
            console.error('Registration failed');
            return;
          }
          this.userService.createUser(user);
          this.router.navigate(['/users']);
        },
        (error) => {
          console.error('Registration failed: ', error);
        }
      );
    } else {
      console.error('registerForm invalid');
    }
  }

  validEmail(control: FormControl): { [key: string]: boolean } | null {
    const email = control.value;
    const regexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    
    return regexp.test(email) ? null : { 'email': true };
  }
  
  validPassword(control: FormControl): { [key: string]: boolean } | null {
    const password = control.value;
    const regexp = /^[a-zA-Z]([a-zA-Z0-9]){2,14}$/;
  
    return regexp.test(password) ? null : { 'password': true };
  }
}
