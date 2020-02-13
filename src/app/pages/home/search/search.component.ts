import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MovieService } from 'src/app/core/services/movie.service';
import { Movie } from 'src/app/core/models/movie';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output() movies: EventEmitter<Movie[]> = new EventEmitter<Movie[]>();
  
  public searchForm: FormGroup;
  
  constructor(private movieService: MovieService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchTerm: [
        '', //valeur par defaut
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(255)
        ])
      ]
    });
  }

  public get searchTerm(): AbstractControl{
    return this.searchForm.controls.searchTerm;
  }

  public validSearch(): void {
    var search = this.searchTerm.value.trim();
    if (search.length >= 2) {
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

  public reload(): void {
    var search = this.searchTerm.value.trim();
    if (search.length == 0) {
        
      console.log('faut reload les films !')

      let movies: Movie[] = [];
      this.movieService.all()
        .pipe(
          take(1)
        )
        .subscribe((reponse: any[]) => {
          movies = reponse.map((movie: Movie) => {
            return new Movie().deserialize(movie);
          });
          this.movies.emit(movies);
        });

    }
  }

}
