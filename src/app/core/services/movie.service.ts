import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/movie';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { take, map, catchError} from 'rxjs/operators';
import { MovieFull } from '../models/movie-full';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { MovieInterface } from './../models/movie-interface'


@Injectable({
  providedIn: 'root'
})
export class MovieService {

 public movieToCreate = new MovieFull();
  public newMovie: MovieFull;
  public movies: Observable<Movie[]>;
  public movie: Observable<MovieFull>;

  constructor(
    private httpClient: HttpClient,
    private _snackBar: MatSnackBar) {

  }

  public all() : Observable<Movie[]> {
    const apiRoute: string = `${environment.apiRoot}movie`;
    this.movies = this.httpClient.get<any[]>(apiRoute).pipe(
      take(1),
      map(
        (reponse) => {
          return reponse.map((item => {
            return new Movie().deserialize(item)
          }))
        }
      )
    );
    return this.movies? this.movies:of([]);
  }

  public byId(id: number) : Observable<MovieFull> {
    const apiRoute: string = `${environment.apiRoot}movie/${id}`;
    return this.httpClient
      .get<any>(apiRoute,{observe: 'response'})
      .pipe(
        take(1),
        map( (reponse) => new MovieFull().deserialize(reponse.body) ),
        catchError( (error:any) => {
          console.log(`Something went wrong : ${JSON.stringify(error)}`);
          return throwError(error.status);
        })
      );
  }

  public likedByIdUser(id: number) : Observable<Movie[]> {
    const apiRoute: string = `${environment.apiRoot}movie/likedByIdUser?id=${id}`;
    this.movies = this.httpClient.get<any[]>(apiRoute).pipe(
      take(1),
      map(
        (reponse) => {
          return reponse.map((item => {
            return new Movie().deserialize(item)
          }))
        }
      )
    );
    return this.movies? this.movies:of([]);
  }

  public modify(movieUpdated: MovieFull) : Observable<HttpResponse<any>> {
    const apiRoute: string = `${environment.apiRoot}movie/modify`;
    console.log('movie updated !')
     this._snackBar.open("Update!", "", {
              duration: 2500,
              verticalPosition:'bottom'})
    return this.httpClient.put<any>(apiRoute, movieUpdated, {observe: 'response'})
          .pipe(
            take(1),
            map((response: HttpResponse<any>) => {
        return response;
            }));

  }

  public delete(movie: MovieFull) : Observable<HttpResponse<any>> {
    const apiRoute: string = `${environment.apiRoot}movie/${movie.idMovie}`;
    return this.httpClient.delete<any>(apiRoute, {observe: 'response'})
          .pipe(
            take(1),
            map((response: HttpResponse<any>) => {
              return response;
            }));
  }

  public createMovie(movie) : Promise<boolean> {
    console.log('> movieService.createMovie() was called.')
    const apiRoute: string = `${environment.apiRoot}movie`;
    return new Promise<boolean> ((resolve) => {
      this.httpClient.post<any> (apiRoute, movie, { observe: 'response' } )
      .pipe(
        take(1)
      ).subscribe((response: HttpResponse<any>) => {
        if (response.status === 200 ) {
          this.newMovie = response.body; 
          console.log(this.newMovie);
          resolve(true);
        } else {
          console.log('the request to the Back FAILED');
          resolve(false);
        }     
      });
    })
  }
    

  public byTitle(search: string) : Observable<Movie[]> {
    const apiRoute: string = `${environment.apiRoot}movie/byTitleContaining?t=${search}`;
    this.movies = this.httpClient.get<any[]>(apiRoute).pipe(
      take(1),
      map(
        (reponse) => {
          return reponse.map((item => {
            return new Movie().deserialize(item)
          }))
        }
      )
    );
    return this.movies? this.movies:of([]);
  }

  public byYear(year: number) : Observable<Movie[]> {
    const apiRoute: string = `${environment.apiRoot}movie/byYear?y1=${year}`;
    this.movies = this.httpClient.get<any[]>(apiRoute).pipe(
      take(1),
      map(
        (reponse) => reponse.map((item => new Movie().deserialize(item)))
      )
    );
    return this.movies? this.movies:of([]);
  }

  public byTitleAndYear(searchTitle: string, searchYear: number) : Observable<Movie[]> {
    if (searchYear <= 0 ) {
      return this.byTitle(searchTitle)
    } else {
      const apiRoute: string = `${environment.apiRoot}movie/byTitleContainingAndYear?t=${searchTitle}&y=${searchYear}`;
      this.movies = this.httpClient.get<any[]>(apiRoute).pipe(
        take(1),
        map(
          (reponse) => reponse.map((item => new Movie().deserialize(item)))
        )
      );
      return this.movies;
    }
  }

  public like(): Observable<Movie> {
    return null;
  }
}
