import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/core/services/movie.service';
import { Movie } from 'src/app/core/models/movie';
import { take } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserInterface } from 'src/app/core/models/user-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public title: string = 'Mon application qui cherche des films (parfois)';
  public moviesOb: Observable<Movie[]>;
  public user: UserInterface;
  public years: number[];
  public yearSelected: number = 0;
  private yearSubsciption: Subscription;
  
  constructor(
    private movieService: MovieService,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.moviesOb = this.movieService.all();
    this.userService.userSubject$.subscribe((user: UserInterface) => {
      this.user = user;
    });

    this.yearSubsciption = this.movieService.years$
      .subscribe((_years) => {
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
      this.router.navigate(['login']);
    })
    ;
  }

  public addLike(movie:Movie, user:UserInterface):void {
    movie.nbLike = movie.nbLike + 1;
    user.likedMovie.add(movie);
    console.log('Like de '+ movie.title + ' : ' + movie.nbLike + ' UserListLiked : ' + JSON.stringify(Array.from(user.likedMovie)))
  }
}
