import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/core/services/movie.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieFull } from 'src/app/core/models/movie-full';
import { take } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {

  public movie: MovieFull;
  public movieAdd: MovieFull;
  public editForm: FormGroup;
  public idMovie: number;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }
  public get addTitle(): AbstractControl {
    return this.editForm.controls.addTitle;
  }
  public get addYear(): AbstractControl {
    return this.editForm.controls.addYear;
  }
 

  public addMovie(): void {
    //console.log('uptate il faudrait')
    this.movieAdd = this.movie;
    this.movieAdd.title = this.addTitle.value;
    this.movieAdd.year = this.addYear.value;
   
    
    this.movieService.addMovie(this.movieAdd).pipe(take(1)).subscribe((response: HttpResponse<any>) => {});
  }


  
}
