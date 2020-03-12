import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/core/services/movie.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieFull } from 'src/app/core/models/movie-full';
import { take, map } from 'rxjs/operators';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { Movie } from 'src/app/core/models/movie';
import { MovieInterface } from 'src/app/core/models/movie-interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {

  private _movie = new MovieInterface();
  private saveMovie = new Movie();

  public addMovieForm: FormGroup;
  // public movie: MovieFull;
  public movie: Movie;
  // public movieAdd: MovieFull;
  public movieAdd: Movie;
  public editForm: FormGroup;
  public idMovie: number;
  public processing: boolean = false;
  private _idMovie: number;
  // public movieBofBof : MovieFull;

  constructor(
    private route: ActivatedRoute,
    private httpClient : HttpClient,
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
      years: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4)
        ])
      ]
    });
  }


  public get title(): AbstractControl {
    return this.addMovieForm.controls.title;
  }
  public get year(): AbstractControl {
    return this.addMovieForm.controls.year;
  }
  // public get addSynopsis(): AbstractControl {
  //   return this.editForm.controls.addSynopsis;
  // }
  // public get addDuration(): AbstractControl {
  //   return this.editForm.controls.addDuration;
  // }
 

 
public async addMovie(title, year) {
  console.log('need to create movie : ' + JSON.stringify(this._movie));
  //  this._movie.idMovie = this.idMovie.value;
  const apiRoute  =`${environment.movie}`;
  this.saveMovie.title= this._movie.title;
  this.saveMovie.year= this._movie.year;
  // this._movie.year = this.year.value;



  return this.httpClient.post<any>(
    apiRoute,
    this.saveMovie
  ).pipe(
    map( (response) => {
      this._snackBar.open("Film crée !","Succès !", {
        duration: 2500,
        verticalPosition:'top'
      }) 
    }) )
    
  } 
    // console.log('need to create movie : ' + JSON.stringify(this._movie));
    // const response:HttpResponse<any> = await (this.movieService.addMovie(this.saveMovie));
    // console.log(JSON.stringify(response));
  //   if (response.status == 200 ) {
  //     this._snackBar.open("Film créé !","Succes !", {
  //       duration: 2500,
  //       verticalPosition:'top'
  //     }) 

  // }
  





}

