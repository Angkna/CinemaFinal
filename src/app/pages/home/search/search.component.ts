import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MovieService } from 'src/app/core/services/movie.service';
import { Movie } from 'src/app/core/models/movie';
import { debounceTime, map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output() movies: EventEmitter<Observable<Movie[]>> = new EventEmitter<Observable<Movie[]>>();
  
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

    this.searchTerm.valueChanges.pipe(
      debounceTime(400),
      map(() => {
        console.log('lancement recherche')
        this.validSearch();
      })
    ).subscribe();
  }

  public get searchTerm(): AbstractControl{
    return this.searchForm.controls.searchTerm;
  }

  public validSearch(): void {
    var search = this.searchTerm.value.trim();
    if (search.length >= 2) {
      this.movies.emit(this.movieService.byTitle(search));
    };
  }

  public reload(): void {
    var search = this.searchTerm.value.trim();
    if (search.length == 0) {
      this.movies.emit(this.movieService.all());
    };
  }
}
