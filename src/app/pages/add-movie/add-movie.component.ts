import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/core/services/movie.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieFull } from 'src/app/core/models/movie-full';
import { take, map } from 'rxjs/operators';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { Movie } from 'src/app/core/models/movie';
// import { MovieInterface } from 'src/app/core/models/movie-interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {

  private _movie = new MovieFull();
  // private saveMovie = new MovieFull();

  public addMovieForm: FormGroup;
  public movie: MovieFull;
  // public movie: Movie;
  // public movieAdd: MovieFull;
  public movieAdd: Movie;
  public editForm: FormGroup;
  public idMovie: number;
  public processing: boolean = false;
  private _idMovie: number;
  // public movieBofBof : MovieFull;

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private movieService: MovieService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,

  ) { }

  ngOnInit(): void {

    this.addMovieForm = this.formBuilder.group({
      title: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255)
        ])
      ],
      year: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4)
        ])
      ]
      // duration: [
      //   '',
      //   Validators.compose([
      //     Validators.required,
      //     Validators.minLength(3),
      //     Validators.maxLength(3)
      //   ])
      // ]
    });
  }


  public get title(): AbstractControl {
    return this.addMovieForm.controls.title;
  }
  public get year(): AbstractControl {
    return this.addMovieForm.controls.year;
  }
  // public get synopsis(): AbstractControl {
  //   return this.editForm.controls.synopsis;
  // }
  // public get duration(): AbstractControl {
  //   return this.editForm.controls.duration;
  // }

  public  addMovie() {
    this.movieService.movieToCreate.title = this.title.value;
    this.movieService.movieToCreate.year = this.year.value;
    // this.movieService.movieToCreate.duration = this.duration.value;
    this.movieService.createMovie(this.movieService.movieToCreate)
      .pipe(
        take(1)
      ).subscribe((response: HttpResponse<any>) => {
        console.log('movie was created');
        console.log(this.movieService.newMovie.idMovie);
        // return this.router.navigate(['../', 'movie',  this.movieService.newMovie.idMovie]);
      })
      
    //  await this.router.navigate(['../', 'movie',  this.movieService.newMovie.idMovie]);
      
    }

  }


