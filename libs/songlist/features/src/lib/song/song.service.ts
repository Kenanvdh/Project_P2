import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiResponse, ISong } from '@indivproj-p2/shared/api';
import { Injectable } from '@angular/core';

export const httpOptions = {
    observe: 'body',
    responseType: 'json',
};

@Injectable()
export class SongService {
    endpoint = 'http://localhost:3000/api/song';

    constructor(private readonly http: HttpClient) {}

    public list(options?: any): Observable<ISong[] | null> {
        console.log(`list ${this.endpoint}`);

        return this.http
            .get<ApiResponse<ISong[]>>(this.endpoint, {
                ...options,
                ...httpOptions,
            })
            .pipe(
                map((response: any) => response.results as ISong[]),
                tap(console.log),
                catchError(this.handleError)
            );
    }

    public read(id: string | null, options?: any): Observable<ISong> {
        console.log(`read ${this.endpoint}`);
        return this.http
            .get<ApiResponse<ISong>>(this.endpoint, {
                ...options,
                ...httpOptions,
            })
            .pipe(
                tap(console.log),
                map((response: any) => response.results as ISong),
                catchError(this.handleError)
            );
    }

    public handleError(error: HttpErrorResponse): Observable<any> {
        console.log('handleError in SongService', error);

        return throwError(() => new Error(error.message));
    }
}
 