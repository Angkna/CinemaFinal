import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { TranslateService } from '@ngx-translate/core';


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

export class HomeComponent implements OnInit, OnDestroy {

  public title: string = 'Mon application qui cherche des films (parfois)';
  public moviesOb: Observable<Movie[]>;
  public user: UserInterface;
  public years: number[];
  public yearSelected: number = 0;
  private socket$: WebSocketSubject<any>;
  public serverMessages: any[];

  public currentYear: number;
  private translationChange$: any;
  
  constructor(
    private movieService: MovieService,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private router: Router,

    private httpClient: HttpClient,
    private translateService: TranslateService
    ) {    }

  public getCurrentYear(): void {
    this.httpClient.get<any>('http://worldclockapi.com/api/json/utc/now')
        .pipe( take(1) )
        .subscribe( (utcDateTime:any) => {
          this.currentYear = parseInt(utcDateTime.currentDateTime.split('-')[0]);
          console.log(this.currentYear)
        });
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
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

    this.getCurrentYear();

    this.moviesOb = this.movieService.all();

    this.userService.userSubject$.subscribe((user: UserInterface) => {
      this.user = user;
    });
    this.movieService.years$.subscribe((_years) => {
      this.years = _years;
    });
  }

  public searchedListMovies($event):void {
    this.moviesOb = $event;
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
    //.afterDismissed().pipe(take(1)).subscribe((a) => {
    //this.router.navigate(['login']);
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
}
