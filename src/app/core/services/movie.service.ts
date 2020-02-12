import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/movie';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  public movies: Observable<Movie[]>;

  constructor(private httpClient: HttpClient) { }

  public all() : Observable<Movie[]> {
    const apiRoute: string = `${environment.apiRoot}movie`;
    this.movies = this.httpClient.get<Movie[]>(apiRoute);
    return this.movies;
  }

  public byTitle(search: string) : Observable<Movie[]> {
    const apiRoute: string = `${environment.apiRoot}movie/byTitleContaining?t=${search}`;
    this.movies = this.httpClient.get<Movie[]>(apiRoute);
    return this.movies;
  }
}
