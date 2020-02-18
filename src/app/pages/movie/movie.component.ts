import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/core/services/movie.service';
import { Observable } from 'rxjs';
import { MovieFull } from 'src/app/core/models/movie-full';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { take } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  public movie: MovieFull;
  public movieUpdate : MovieFull;
  public editForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) {  }

  ngOnInit(): void {
    let movie: Observable<MovieFull>;
    this.route.paramMap.subscribe((paramMap: any) => {
    movie = this.movieService.byId(paramMap.params.id);
    });

    movie.pipe(take(1)).subscribe((m) => {
      this.movie = m;
      this.editForm = this.formBuilder.group({
        editTitle: [
          m.title, //valeur par defaut
          Validators.compose([
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(255)
          ])
        ],
        editYear: [
          m.year, //valeur par defaut
          Validators.compose([
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(4),
            Validators.pattern('[0-9]')
          ])
        ]
      });
    });
  }

  public get editTitle(): AbstractControl{
    return this.editForm.controls.editTitle;
  }
  public get editYear(): AbstractControl{
    return this.editForm.controls.editYear;
  }

  public update(): void {
    this.movieUpdate = this.movie;
    this.movieUpdate.title = this.editTitle.value;
    this.movieUpdate.year = this.editYear.value;
    this.movieService.modify(this.movieUpdate).pipe(take(1)).subscribe((response:HttpResponse<any>)=>{
    });
  }

  public delete(): void{
    this._snackBar.open("Etes vous sure de vouloir supprimer ce film ? Cette action ne pourra pas être annulée.","Confirmation", {
      duration: 4000,
      verticalPosition:'top'
    }).onAction().pipe(take(1)).subscribe( () => {
      this.movieService.delete(this.movie).pipe(take(1)).subscribe( () => this.router.navigate(['home']) );
    })
  }
}
