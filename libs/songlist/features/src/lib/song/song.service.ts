import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiResponse, ISong } from '@indivproj-p2/shared/api';
import { Injectable } from '@angular/core';
import { environment } from '@indivproj-p2/shared/util-env';
 
export const httpOptions = {
  observe: 'body',
  responseType: 'json',
};

@Injectable({
  providedIn: 'root',
})

export class SongService {
  endpoint = `${environment.backendUrl}/song`;

  constructor(private readonly http: HttpClient) {}

  public list(options?: any): Observable<ISong[] | null> {
    console.log(`list ${this.endpoint}`);

    return this.http
      .get<ApiResponse<ISong[]>>(this.endpoint, {
        ...options,
        observe: 'body',
        responseType: 'json',
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
      .get<ApiResponse<ISong>>(`${this.endpoint}/${id}`, {
        ...options,
        observe: 'body',
        responseType: 'json',
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results as ISong),
        catchError(this.handleError)
      );
  }

  public create(song: ISong): Observable<ISong> {
    console.log(`create ${this.endpoint}`);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http
      .post<ApiResponse<ISong>>(this.endpoint, song, httpOptions)
      .pipe(
        tap(console.log),
        map((response: any) => response.results as ISong),
        catchError(this.handleError)
      );
  }

  public update(song: ISong): Observable<ISong> {
    return this.http
      .put<ApiResponse<ISong>>(`${this.endpoint}/${song.id}`, song)
      .pipe(tap(console.log), catchError(this.handleError));
  }

  public delete(song: ISong): Observable<ISong> {
    return this.http
      .delete<ApiResponse<ISong>>(`${this.endpoint}/${song.id}`)
      .pipe(tap(console.log), catchError(this.handleError));
  }

  public handleError(error: HttpErrorResponse): Observable<any> {
    console.log('handleError in SongService', error);

    return throwError(() => new Error(error.message));
  }
}
