import { Component, OnInit, Output } from '@angular/core';
import { MovieService } from 'src/app/core/services/movie.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { debounceTime, map, take } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { Data } from 'src/app/core/models/data';
import { EventEmitter } from '@angular/core';
import { PersonService } from 'src/app/core/services/person.service';
import { Movie } from 'src/app/core/models/movie';
import { Person } from 'src/app/core/models/person';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/core/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-advenced-search',
  templateUrl: './advenced-search.component.html',
  styleUrls: ['./advenced-search.component.scss']
})
export class AdvencedSearchComponent implements OnInit {

//  public datas: Observable<Data[]> ;
 public movies : Observable<Movie[]>;
 public persons : Observable<Person[]> ;
 public currentBirthdate: number;
 public currentYear: number;

  public searchForm: FormGroup;

  constructor(private movieService: MovieService, private personService: PersonService, private formBuilder: FormBuilder, 
    private router: Router,
    private httpClient: HttpClient,
    private userService: UserService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchTitle: [
        '', 
        Validators.compose([
          Validators.minLength(2),
          Validators.maxLength(255)
        ])
      ],
      searchPerson: [
        '', 
        Validators.compose([
          Validators.minLength(2),
          Validators.maxLength(80)
        ])
      ],
      searchYear: [
        '', 
        Validators.compose([
          Validators.pattern("[0-9]{4}")
        ])
      ]
      
      // searchDuration: [
      //   '', 
      //   Validators.compose([
      //     Validators.minLength(1),
      //     Validators.maxLength(3)
      //   ])
      // ]

    });

    this.searchTitle.valueChanges.pipe(
      debounceTime(400),
      map(() => {
       console.log('lancement recherche')
        this.validSearchTitle();
      })
    ).subscribe();

    this.searchPerson.valueChanges.pipe(
      debounceTime(400),
      map(() => {
       console.log('lancement recherche')
        this.validSearchPerson();
      })
    ).subscribe();

    this.searchYear.valueChanges.pipe(
      debounceTime(400),
      map(() => {
       console.log('lancement recherche')
        this.validSearchYear();
      })
    ).subscribe();
   
  }
  

  //////////////////////FILM ///////////////////////

  public get searchTitle(): AbstractControl{
    return this.searchForm.controls.searchTitle;
  }

  public validSearchTitle(): void {
    //console.log('advenced research test');
    var search = this.searchTitle.value.trim();
     if (search.length >= 2) {
      this.movies = (this.movieService.byTitle(search)  );
      console.log('Les datas  : ' + JSON.stringify(this.movies));
    };
  }

   reloadTitle(): void {
    var search = this.searchTitle.value.trim();
    if (search.length == 0) {
      this.movies =  (this.movieService.all())  ;
      
    };
   }

/////////////////////PERSON ///////////////////
public get searchPerson(): AbstractControl{
  return this.searchForm.controls.searchPerson;
}

public validSearchPerson(): void {

  var search = this.searchPerson.value.trim();
   if (search.length >= 2) {
    this.persons = ( this.personService.byName(search) );
    console.log('Les datas  : ' + JSON.stringify(this.persons));
  };
}

reloadPerson(): void {
  var search = this.searchPerson.value.trim();
  if (search.length == 0) {
    this.persons = ( this.personService.all()  );
    
  };

}
  
///////////////////////////YEAR////////////////////
public get searchYear(): AbstractControl{
  return this.searchForm.controls.searchYear;
}

public validSearchYear(): void {

  var search = this.searchYear.value.trim();
   if (search.length >= 2) {
    // console.log('je chercher lannée');
    this.movies = (this.movieService.byYear(search) );
    console.log('Les datas  : ' + JSON.stringify(this.movies));
  };
}

reloadYear(): void {
    var search = this.searchYear.value.trim();
    if (search.length == 0) {
      this.movies = ( this.movieService.all()  );
      
    };

  }




//////////////////NAVIGATION///////////////
  public returnToMoviePage(): void{
    this.router.navigate([`home/}`] );
  }




  
  public getCurrentYear(): void {
    this.httpClient.get<any>('http://worldclockapi.com/api/json/utc/now')
        .pipe( take(1) )
        .subscribe( (utcDateTime:any) => {
          this.currentYear = parseInt(utcDateTime.currentDateTime.split('-')[0]);
          console.log(this.currentYear)
        });
  }

  public needLoginMovie(idMovie: number): void {
    if (this.userService.user && this.userService.user !== null) {
      this.router.navigate(['../', 'movie', idMovie]);
    } else {
      this._snackBar.open("Vous devez être identifié(e) pour consulter les détails d'un film !", "Redirection en cours...", {
        duration: 2500,
        verticalPosition:'top'
      }).afterDismissed().subscribe((status: any) => {
        const navigationExtras: NavigationExtras = { state: { movie: idMovie } };
        this.router.navigate(['../', 'login'], navigationExtras);
      });

    }
  }

}
