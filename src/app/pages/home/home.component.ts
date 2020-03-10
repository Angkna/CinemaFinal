import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition  } from '@angular/animations';
import { MovieService } from 'src/app/core/services/movie.service';
import { Movie } from 'src/app/core/models/movie';
import { take, map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserInterface } from 'src/app/core/models/user-interface';
import { Router } from '@angular/router';
import { WebSocketSubject } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Person } from 'src/app/core/models/person';
import { PersonService } from 'src/app/core/services/person.service';
import { Data } from 'src/app/core/models/data';

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

  public personsOb: Observable<Person[]>;
  public moviesOb: Observable<Movie[]>;
  public dataOb: Observable<Data[]>;

  public user: UserInterface;

  private socket$: WebSocketSubject<any>;
  public serverMessages: any[];

  public currentYear: number;
  
  constructor(
    private movieService: MovieService,
    private personService: PersonService,
    private userService: UserService,
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
    
    this.getCurrentYear();

    this.moviesOb = this.movieService.all();
    this.personsOb = this.personService.all();

    this.userService.userSubject$.subscribe((user: UserInterface) => {
      this.user = user;
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
    this.dataOb = $event;

    //TODO charger liste movie + person séparer !!

  }

  public needLogin(idMovie: number):void {
    this._snackBar.open("Vous devez être identifié(e) pour consulter les détails !","Redirection en cours...", {
      duration: 2500,
      verticalPosition:'top'
    }).afterDismissed().pipe(take(1)).subscribe((a) => {
      this.router.navigate(['login', idMovie]);
    })
    ;
  }

  public needLogin2():void {
    this._snackBar.open("Vous devez être identifié(e) pour like un film...","Désolé !", {
      duration: 2500,
      verticalPosition:'top'
    })
    //.afterDismissed().pipe(take(1)).subscribe( () => {
    //  this.router.navigate(['login']);
    //});
  }

  public addLike(movie:Movie, user:UserInterface):void {
    movie.animationState = "big";
    setTimeout(() => {
      movie.nbLike = movie.nbLike + 1;
      setTimeout(() => {
        movie.animationState = "base";
        setTimeout(() => {
          this.socket$.next(movie);
        }, 1000);
      }, 1);
    }, 1000)
    //user.likedMovie.add(movie);
  }

  public goAdvencedSearch() {
    this.router.navigate(['advencedSearch']);
  }

}
