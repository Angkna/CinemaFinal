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
      this.movieService.byTitle(search)
        .pipe(
          take(1)
        )
        .subscribe((reponse: Movie[]) => {
          this.movies.emit(reponse);
        });
    }
  }

  public reload(): void {
    var search = this.searchTerm.value.trim();
    if (search.length == 0) {
      this.movieService.all()
        .pipe(
          take(1)
        )
        .subscribe((reponse: Movie[]) => {
          this.movies.emit(reponse);
        });

    }
  }

}
