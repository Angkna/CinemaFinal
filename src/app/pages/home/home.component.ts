import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition  } from '@angular/animations';
import { MovieService } from 'src/app/core/services/movie.service';
import { Movie } from 'src/app/core/models/movie';
import { take, map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { UserInterface } from 'src/app/core/models/user-interface';
import { Router, NavigationExtras } from '@angular/router';
import { WebSocketSubject } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Person } from 'src/app/core/models/person';
import { PersonService } from 'src/app/core/services/person.service';
import { DataService } from 'src/app/core/services/data.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('addLike', [
      // ...
      state('big', style({
        transform: 'scale(3)'
      })),
      state('base', style({
        transform: 'scale(1)'
      })),
      transition('base => big', [
        animate('1s')
      ]),
      transition('big => base', [
        animate('1s')
      ]),
    ]
  )]
})

export class HomeComponent implements OnInit {

  public title: string = 'Mon application qui cherche des films (parfois)';
  private static readonly API: string = 'http://worldclockapi.com/api/json/utc/now';
  public age : number ;

  public personsOb: Observable<Person[]>;
  public moviesOb: Observable<Movie[]>;

  public user: UserInterface;
  public years: number[];
  public yearSelected: number = 0;
  public birthdate: number =0;
  public birthdates: number[];
  public birthdatesSelected: number = 0;
  private socket$: WebSocketSubject<any>;
  public serverMessages: any[];

  public name: string;
  public currentYear: number;
  public currentBirthdate: number;
  
  constructor(
    private movieService: MovieService,
    private personService: PersonService,
    private userService: UserService,

    private dataService: DataService,

    private _snackBar: MatSnackBar,
    private router: Router,
    private httpClient: HttpClient
    ) {    }


  public getCurrentYear(): void {
    this.httpClient.get<any>('http://worldclockapi.com/api/json/utc/now')
        .pipe( take(1) )
        .subscribe( (utcDateTime:any) => {
          this.currentYear = parseInt(utcDateTime.currentDateTime.split('-')[0]);
          console.log(this.currentYear)
        });
  }

  ngOnInit(): void {

    this.moviesOb = this.movieService.all();
    this.personsOb = this.personService.all();
    this.getCurrentYear();
    this.userService.userSubject$.subscribe((user: UserInterface) => {
      this.user = user;
    });
    this.personService.birthdate$.subscribe((_birthdate) => {
      this.birthdates = _birthdate;
    });
    this.socket$ = new WebSocketSubject<any>(environment.wssAddress);

    this.socket$.subscribe(
      (message) => {
        console.log('Le serveur envoie : ' + JSON.stringify(message) + ' message.idMovie = ' + message.idMovie);
        this.moviesOb = this.moviesOb.pipe(
          map((movies:Movie[]): Movie[] => {
            movies.forEach((movie:Movie, index:number) => {
              if (message.idMovie == movie.idMovie) {
                movies[index] = message;
              };
            });
            return movies;
          })
        )
      },
      (err) => console.error('Erreur levée : ' + JSON.stringify(err)),
      () => console.warn('Completed!')
    );    

  }

  public searchedListMovies($event):void {
    [this.moviesOb, this.personsOb] = this.dataService.splitData($event);
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

  public needLoginPerson(idPerson: number): void {
    if (this.userService.user && this.userService.user !== null) {
      this.router.navigate(['../', 'person', idPerson]);
    } else {
      this._snackBar.open("Vous devez être identifié(e) pour consulter les détails d'une personne !", "Redirection en cours...", {
        duration: 2500,
        verticalPosition:'top'
      }).afterDismissed().subscribe((status: any) => {
        const navigationExtras: NavigationExtras = { state: { person: idPerson } };
        this.router.navigate(['../', 'login'], navigationExtras);
      });

    }
  }

  public needLoginForLike():void {
    this._snackBar.open("Vous devez être identifié(e) pour aimer un film...", "Désolé !", {
      duration: 2500,
      verticalPosition:'top'
    })
    //.afterDismissed().pipe(take(1)).subscribe( () => {
    //  this.router.navigate(['login']);
    //});
  }

  public contain(movie:Movie, user:UserInterface): Boolean {
    let response = false;
    user.movieLiked.forEach(movielike => {
      if (movielike.idMovie == movie.idMovie) {
        response = true;
      } 
    });
    return response;
  }

  public addLike(movie:Movie, user:UserInterface):void {
    movie.animationState = "big";
      setTimeout(() => {
        movie.animationState = "base";
        setTimeout(() => {
          this.socket$.next(movie);
        }, 1000);
      }, 1000);
    //user.likedMovie.add(movie);
  }

  public unlike(movie:Movie, user:UserInterface): void{
    //TODO
    console.log('need to unlike this ' + JSON.stringify(movie) + ' for user ' + JSON.stringify(user) );
  }

  public goAdvencedSearch() {
    this.router.navigate(['advencedSearch']);
  }

  public goAddMovie() {
    this.router.navigate(['app-add-movie']);
  }

  public goAddPerson() {
    this.router.navigate(['home']);
  }
  
}
