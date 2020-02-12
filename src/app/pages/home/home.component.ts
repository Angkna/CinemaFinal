import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/core/services/movie.service';
import { Movie } from 'src/app/core/models/movie';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public title: string = 'movies';
  public movies: Movie[] = [];
  public years: number[];
  public yearsSet: Set<number> = new Set();
  public yearSelected: number = -1;
  
  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.all()
      .pipe(
        take(1)
      )
      .subscribe((reponse: any[]) => {
        console.log(`Reponse : ${JSON.stringify(reponse)}`);
        this.movies = reponse.map((movie: Movie) => {
          this.yearsSet.add(movie.year);
          return new Movie().deserialize(movie);
        });
        this.years = Array.from(this.yearsSet).sort();
      });
  }

  public updateListMovies($event):void {
    this.movies = $event;

    this.yearsSet.clear();
    this.movies.forEach((movie:Movie) => {
      this.yearsSet.add(movie.year);
    })
    this.years = Array.from(this.yearsSet).sort();
    this.yearSelected = 0;

  }
}
