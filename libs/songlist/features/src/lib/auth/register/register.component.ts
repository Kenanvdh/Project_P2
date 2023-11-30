import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../../user/user.service';
import { UserRole } from '../../../../../../shared/api/src/lib/models/user.model';

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
  });
  subs: Subscription | null = null;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      age: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      role: new FormControl(UserRole.guest, [Validators.required]),
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
      this.userService.create(this.registerForm.value).subscribe((user) => {
        console.log('Registration succeeded');
        this.router.navigate(['/users'], { relativeTo: this.route });
      });
    } else {
      console.error('Registration returned null user');
    }
  }

  validEmail(control: FormControl): { [key: string]: boolean } | null {
    const email = control.value;
    const regexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    return regexp.test(email) ? null : { email: true };
  }

  validPassword(control: FormControl): { [key: string]: boolean } | null {
    const password = control.value;
    const regexp = /^[a-zA-Z]([a-zA-Z0-9]){2,14}$/;

    return regexp.test(password) ? null : { password: true };
  }
}
