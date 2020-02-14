import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/movie';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { MovieFull } from '../models/movie-full';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  public movies: Observable<Movie[]>;
  public movie: Observable<MovieFull>;
  private _years: Set<number> = new Set<number>();
  public years$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>( Array.from(this._years).sort() );

  constructor(private httpClient: HttpClient) { }

  public all() : Observable<Movie[]> {
    this._years = new Set<number>();
    const apiRoute: string = `${environment.apiRoot}movie`;
    this.movies = this.httpClient.get<any[]>(apiRoute).pipe(
      take(1),
      map(
        (reponse) => {
          return reponse.map((item => {
            this._years.add(item.year);
            this.years$.next(Array.from(this._years).sort());
            return new Movie().deserialize(item)
          }))
        }
      )
    );
    return this.movies;
  }

  public byId(id: number) : Observable<MovieFull> {
    const apiRoute: string = `${environment.apiRoot}movie/${id}`;
    this.movie = this.httpClient.get<any>(apiRoute).pipe(
      take(1),
      map( (reponse) => new MovieFull().deserialize(reponse) )
    );
    return this.movie 
  }

  public byTitle(search: string) : Observable<Movie[]> {
    this._years = new Set<number>();
    const apiRoute: string = `${environment.apiRoot}movie/byTitleContaining?t=${search}`;
    this.movies = this.httpClient.get<any[]>(apiRoute).pipe(
      take(1),
      map(
        (reponse) => {
          return reponse.map((item => {
            this._years.add(item.year);
            this.years$.next(Array.from(this._years).sort());
            return new Movie().deserialize(item)
          }))
        }
      )
    );
    return this.movies;
  }

  public byYear(year: number) : Observable<Movie[]> {
    this._years = new Set<number>();
    const apiRoute: string = `${environment.apiRoot}movie/byYear?y1=${year}`;
    this.movies = this.httpClient.get<any[]>(apiRoute).pipe(
      take(1),
      map(
        (reponse) => {
          return reponse.map((item => {
            this._years.add(item.year);
            this.years$.next(Array.from(this._years).sort());
            return new Movie().deserialize(item)
          }))
        }
      )
    );
    return this.movies;
  }

  public byTitleAndYear(searchTitle: string, searchYear: number) : Observable<Movie[]> {
    if (searchYear <= 0 ) { 
      return this.byTitle(searchTitle) 
    } else {
      this._years = new Set<number>();
      const apiRoute: string = `${environment.apiRoot}movie/byTitleContainingAndYear?t=${searchTitle}&y=${searchYear}`;
      this.movies = this.httpClient.get<any[]>(apiRoute).pipe(
        take(1),
        map(
          (reponse) => {
            return reponse.map((item => {
              this._years.add(item.year);
              this.years$.next(Array.from(this._years).sort());
              return new Movie().deserialize(item)
            }))
          }
        )
      );
      return this.movies;
    }
  } 
}
