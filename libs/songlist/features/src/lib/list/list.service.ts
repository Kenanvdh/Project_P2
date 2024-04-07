import { Observable, forkJoin, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiResponse, IList } from '@indivproj-p2/shared/api';
import { Injectable } from '@angular/core';
import { environment } from '@indivproj-p2/shared/util-env';

export const httpOptions = {
  observe: 'body',
  responseType: 'json',
};

@Injectable({
  providedIn: 'root',
})
export class ListService {
  endpoint = `${environment.backendUrl}/list`;

  constructor(private readonly http: HttpClient) {}

  public list(options?: any): Observable<IList[] | null> {
    console.log(`list ${this.endpoint}`);

    return this.http
      .get<ApiResponse<IList[]>>(this.endpoint, {
        ...options,
        observe: 'body',
        responseType: 'json',
      })
      .pipe(
        map((response: any) => response.results as IList[]),
        tap(console.log),
        catchError(this.handleError)
      );
  }

  public read(id: string | null, options?: any): Observable<IList> {
    console.log(`read ${this.endpoint}`);
    return this.http
      .get<ApiResponse<IList>>(`${this.endpoint}/${id}`, {
        ...options,
        observe: 'body',
        responseType: 'json',
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results as IList),
        catchError(this.handleError)
      );
  }

  public recommended(id: string | null, options?: any): Observable<IList[]> {
    console.log(`recommended ${this.endpoint}`);
    return this.http
      .get<ApiResponse<IList[]>>(`${this.endpoint}/${id}/recommended`, {
        ...options,
        observe: 'body',
        responseType: 'json',
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results as IList[]),
        catchError(this.handleError)
      );
  }

  public create(list: IList): Observable<IList> {
    console.log(`create ${this.endpoint}`);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http
      .post<ApiResponse<IList>>(this.endpoint, list, httpOptions)
      .pipe(
        tap(console.log),
        map((response: any) => response.results as IList),
        catchError(this.handleError)
      );
  }

  public update(list: IList): Observable<IList> {
    return this.http
      .put<ApiResponse<IList>>(`${this.endpoint}/${list.id}`, list)
      .pipe(tap(console.log), catchError(this.handleError));
  }

  public delete(list: IList): Observable<IList> {
    return this.http
      .delete<ApiResponse<IList>>(`${this.endpoint}/${list.id}`)
      .pipe(tap(console.log), catchError(this.handleError));
  }

  public handleError(error: HttpErrorResponse): Observable<any> {
    console.log('handleError in ListService', error);

    return throwError(() => new Error(error.message));
  }
}
