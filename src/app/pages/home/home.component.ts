import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/core/services/movie.service';
import { Movie } from 'src/app/core/models/movie';
import { take } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public title: string = 'Mon application qui cherche des films (parfois)';
  public moviesOb: Observable<Movie[]>;
  public movies: Movie[] = [];
  public moviesYear: Movie[];
  public years: number[];
  public yearSelected: number = -1;
  private yearSubsciption: Subscription;
  
  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.moviesOb = this.movieService.all();

    this.yearSubsciption = this.movieService.years$
      .subscribe((_years) => {
        this.years = _years;
      });
  }

  public searchedListMovies($event):void {
    this.moviesOb = $event;
    // this.moviesOb.pipe(take(1)).subscribe(listMovie => {
    //   this.years = this._getYearsList(listMovie);
    // })
  }

  public updateListMoviesByYear():void {
    // this.moviesYear = [];
    // if (this.yearSelected != 0){
    //   this.movies.forEach((movie:Movie) => {
    //     if (movie.year == this.yearSelected) {
    //       this.moviesYear.push(movie);
    //     }
    //   })
    // } else {
    //   this.moviesYear = this.movies;
    // }
  }

  private _getYearsList(listMovie: Movie[]): number[] {
    var yearsSet: Set<number> = new Set();
    listMovie.forEach((movie:Movie) => {
      yearsSet.add(movie.year);
    })
    return Array.from(yearsSet).sort();
  }
}
