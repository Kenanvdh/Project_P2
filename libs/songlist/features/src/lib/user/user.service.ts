import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiResponse, IUser } from '@indivproj-p2/shared/api';
import { Injectable } from '@angular/core';

export const httpOptions = {
    observe: 'body',
    responseType: 'json',
};

@Injectable({
    providedIn: 'root',
})
export class UserService {
    endpoint = 'http://localhost:3000/api/user';

    constructor(private readonly http: HttpClient) {}

    public list(options?: any): Observable<IUser[] | null> {
        console.log(`list ${this.endpoint}`);

        return this.http
            .get<ApiResponse<IUser[]>>(this.endpoint, {
                ...options,
                ...httpOptions,
            })
            .pipe(
                map((response: any) => response.results as IUser[]),
                tap(console.log),
                catchError(this.handleError)
            );
    }

    public read(id: string | null, options?: any): Observable<IUser> {
        console.log(`read ${this.endpoint}/${id}`);
        return this.http
            .get<ApiResponse<IUser>>(`${this.endpoint}/${id}`, {
                ...options,
                ...httpOptions,
            })
            .pipe(
                tap(console.log),
                map((response: any) => response.results as IUser),
                catchError(this.handleError)
            );
    }

    public handleError(error: HttpErrorResponse): Observable<any> {
        console.log('handleError in UserService', error);

        return throwError(() => new Error(error.message));
    }
}
 
