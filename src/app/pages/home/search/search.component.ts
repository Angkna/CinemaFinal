import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MovieService } from 'src/app/core/services/movie.service';
import { Movie } from 'src/app/core/models/movie';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  //public movies: Movie[] = [];
  public input: string;
  @Output() movies: EventEmitter<Movie[]> = new EventEmitter<Movie[]>();

  constructor(private movieService: MovieService) { }
  ngOnInit(): void {
  }

  public validSearch(input): void {
    var search = input.trim();
    if (search.length > 0) {
      let movies: Movie[] = [];
      console.log('je lance une recherche sur :' + search)
      this.movieService.byTitle(search)
        .pipe(
          take(1)
        )
        .subscribe((reponse: any[]) => {
          console.log(`Reponse : ${JSON.stringify(reponse)}`);
          movies = reponse.map((movie: Movie) => {
            return new Movie().deserialize(movie);
          });
          this.movies.emit(movies);
        });
    }
  }

}
