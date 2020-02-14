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
  //public movies: Movie[] = [];
  //public moviesYear: Movie[];
  public years: number[];
  public yearSelected: number = 0;
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
  }

  public updateListMoviesByYear(): void {

  }

}
