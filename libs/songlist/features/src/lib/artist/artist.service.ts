import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
} from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
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
  endpoint = `${environment.backendUrl}/song/:id/artist`;

  constructor(private readonly http: HttpClient) {}

  public read(options?: any): Observable<IArtist> {
    console.log(`read ${this.endpoint}`);
    
    return this.http
      .get<ApiResponse<IArtist>>(this.endpoint, {
        ...options,
        observe: 'body',
        responseType: 'json',
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results as IArtist),
      );
  }
  
}
