import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { ApiResponse, IArtist } from '@indivproj-p2/shared/api';
import { Injectable } from '@angular/core';
import { environment } from '@indivproj-p2/shared/util-env';

export const httpOptions = {
  observe: 'body',
  responseType: 'json',
};

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  endpoint = `${environment.backendUrl}/artist`;

  constructor(private readonly http: HttpClient) {}

  public list(options?: any): Observable<IArtist[] | null> {
    console.log(`list ${this.endpoint}`);

    return this.http
      .get<ApiResponse<IArtist[]>>(this.endpoint, {
        ...options,
        observe: 'body',
        responseType: 'json',
      })
      .pipe(
        map((response: any) => response.results as IArtist[]),
        tap(console.log),
        catchError(this.handleError)
      );
  }

  public read(id: string | null, options?: any): Observable<IArtist> {
    console.log(`read ${this.endpoint}`);
    return this.http
      .get<ApiResponse<IArtist>>(`${this.endpoint}/${id}`, {
        ...options,
        observe: 'body',
        responseType: 'json',
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results as IArtist),
        catchError(this.handleError)
      );
  }

  public create(artist: IArtist): Observable<IArtist> {
    console.log(`create ${this.endpoint}`);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http
      .post<ApiResponse<IArtist>>(this.endpoint, artist, httpOptions)
      .pipe(
        tap(console.log),
        map((response: any) => response.results as IArtist),
        catchError(this.handleError)
      );
  }

  public update(artist: IArtist): Observable<IArtist> {
    return this.http
      .put<ApiResponse<IArtist>>(`${this.endpoint}/${artist.id}`, artist)
      .pipe(tap(console.log), catchError(this.handleError));
  }

  public delete(artist: IArtist): Observable<IArtist> {
    return this.http
      .delete<ApiResponse<IArtist>>(`${this.endpoint}/${artist.id}`)
      .pipe(tap(console.log), catchError(this.handleError));
  }

  public handleError(error: HttpErrorResponse): Observable<any> {
    console.log('handleError in ArtistService (frontend)', error);
    return throwError(() => new Error(error.message));
  }
}
