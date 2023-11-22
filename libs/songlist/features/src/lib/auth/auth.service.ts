import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '@indivproj-p2/shared/util-env';
import { map, tap, catchError, switchMap } from 'rxjs/operators';
//import { AlertService } from '../shared/alert/alert.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from '@indivproj-p2/shared/api';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUser$ = new BehaviorSubject<IUser | null>(null);
  private readonly CURRENT_USER = 'currentuser';
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(
    // private alertService: AlertService,
    private http: HttpClient,
    private router: Router
  ) {
    // Check of we al een ingelogde user hebben
    // Zo ja, check dan op de backend of het token nog valid is.
    // Het token kan namelijk verlopen zijn. Indien verlopen
    // retourneren we meteen een nieuw token.
    this.getUserFromLocalStorage()
      .pipe(
        switchMap((user: IUser | null) => {
          if (user) {
            console.log('User found in local storage');
            this.currentUser$.next(user);
            return of(user);
          } else {
            console.log(`No current user found`);
            return of(null);
          }
        })
      )
      .subscribe(() => console.log('Startup auth done'));
  }

  login(email: string, password: string): Observable<IUser | null> {
    console.log(`login at ${environment.backendUrl}/auth/login`);

    return this.http
      .post<IUser>(
        `${environment.backendUrl}/auth/login`,
        { email: email, password: password },
        { headers: this.headers }
      )
      .pipe(
        map((user) => {
          this.saveUserToLocalStorage(user);
          this.currentUser$.next(user);
          //this.alertService.success('You have been logged in');
          return user;
        }),
        catchError((error: any) => {
          console.log('error:', error);
          console.log('error.message:', error.message);
          console.log('error.error.message:', error.error.message);
          //this.alertService.error(error.error.message || error.message);
          return of(null);
        })
      );
  }

  register(userData: IUser): Observable<IUser | null> {
    console.log(`register at ${environment.backendUrl}/users`);
    console.log('User data:', userData);

    return this.http
      .post<IUser>(`${environment.backendUrl}/user`, userData, {
        headers: this.headers,
      })
      .pipe(
        tap((response) => console.log('Registration response:', response)),
        map((user) => {
          console.log('User from registration:', user);
          this.saveUserToLocalStorage(user);
          this.currentUser$.next(user);
          //this.alertService.success('You have been registered');
          return user;
        }),
        catchError((error: any) => {
          console.error('Registration error:', error);
          //this.alertService.error(error.error.message || error.message);
          return of(null);
        })
      );
  }

  /**
   * Validate het token bij de backend API. Als er geen HTTP error
   * als response komt is het token nog valid. We doen dan verder niets.
   * Als het token niet valid is loggen we de user uit.
   */
  validateToken(userData: IUser): Observable<IUser | null> {
    const url = `${environment.backendUrl}/auth/profile`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userData.token,
      }),
    };

    console.log(`validateToken at ${url}`);
    return this.http.get<any>(url, httpOptions).pipe(
      map((response) => {
        console.log('token is valid');
        return response as IUser;
      }),
      catchError((error: any) => {
        console.log('Validate token Failed');
        this.logout();
        this.currentUser$.next(null);
        return of(null);
      })
    );
  }

  logout(): void {
    this.router
      .navigate(['/'])
      .then((success) => {
        // true when canDeactivate allows us to leave the page.
        if (success) {
          console.log('logout - removing local user info');
          localStorage.removeItem(this.CURRENT_USER);
          this.currentUser$.next(null);
          //this.alertService.success('You have been logged out.');
        } else {
          console.log('navigate result:', success);
        }
      })
      .catch((error) => console.log('not logged out!'));
  }

  getUserFromLocalStorage(): Observable<IUser | null> {
    const itemFromStorage = localStorage.getItem(this.CURRENT_USER);
    if (itemFromStorage === null) {
      return of(null);
    } else {
      const localUser = JSON.parse(itemFromStorage);
      return of(localUser);
    }
  }

  private saveUserToLocalStorage(user: IUser): void {
    localStorage.setItem(this.CURRENT_USER, JSON.stringify(user));
  }

  userMayEdit(itemUserId: string): Observable<boolean> {
    return this.currentUser$.pipe(
      map((user: IUser | null) => (user ? user.id === itemUserId : false))
    );
  }
}
