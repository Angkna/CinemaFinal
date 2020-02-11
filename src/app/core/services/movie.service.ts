import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/movie';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private httpClient: HttpClient) { }

  public async allMovies() {
    const apiRoute: string = `${environment.apiRoot}movie`;
    let movies;
    try {
      movies = await fetch(apiRoute);
    } catch(error){
      //cassé
    }
  }

  public all() : Observable<Movie[]> {
    const apiRoute: string = `${environment.apiRoot}movie`;
    return this.httpClient.get<Movie[]>(apiRoute);
  }
}
