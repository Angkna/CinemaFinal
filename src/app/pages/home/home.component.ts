import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/core/services/movie.service';
import { take } from 'rxjs/operators';
import { Movie } from 'src/app/core/models/movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public title: string = 'movies';
  public movies: Movie[] = [];
  public years: number[];
  public yearSelected: number = 0;
  
  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    const yearsSet: Set<number> = new Set();
    this.movieService.all()
      .pipe(
        take(1)
      )
      .subscribe((reponse: any[]) => {
        console.log(`Response : ${JSON.stringify(reponse)}`);
        this.movies = reponse.map((movie: Movie) => {
          yearsSet.add(movie.year);
          return new Movie().deserialize(movie);
        });
        this.years = Array.from(yearsSet).sort();
      });
  }

}
