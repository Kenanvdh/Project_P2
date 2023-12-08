import { Component, OnInit } from '@angular/core';
import { AuthService } from 'libs/songlist/features/src/lib/auth/auth.service';
import { IUser } from '@indivproj-p2/shared/api';

@Component({
  selector: 'indivproj-p2-nav',
  templateUrl: './nav.component.html',
  styles: [],
})
export class NavComponent implements OnInit {
  isLoggedIn = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe({
      next: (user: IUser | null) => {
        if (user) {
          this.isLoggedIn = !!user;
        }
      },
      error: (error) => {
        console.error('Error getting user information:', error);
      },
    });
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
  }
}
