import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MovieService } from 'src/app/core/services/movie.service';
import { debounceTime, map, mergeAll } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Observable, forkJoin } from 'rxjs';
import { Data } from 'src/app/core/models/data';
import { PersonService } from 'src/app/core/services/person.service';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output() datas: EventEmitter<Observable<Data[]>> = new EventEmitter<Observable<Data[]>>();
  
  public searchForm: FormGroup;
  
  constructor(private movieService: MovieService, private personService: PersonService, private formBuilder: FormBuilder) { }

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
       // console.log('lancement recherche')
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
      this.datas.emit( forkJoin(this.movieService.byTitle(search), this.personService.byName(search)).pipe(map(([s1, s2]) => [...s1, ...s2]))  );
    };
  }

  public reload(): void {
    var search = this.searchTerm.value.trim();
    if (search.length == 0) {
      this.datas.emit( forkJoin(this.movieService.all(), this.personService.all()).pipe(map(([s1, s2]) => [...s1, ...s2]))  );
    };
  }
}
