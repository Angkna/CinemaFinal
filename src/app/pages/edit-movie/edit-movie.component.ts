import { Component, OnInit } from '@angular/core';
import { MovieFull } from 'src/app/core/models/movie-full';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/core/services/movie.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.scss']
})
export class EditMovieComponent implements OnInit {

  public movie: MovieFull;
  public movieUpdate: MovieFull;
  public editForm: FormGroup;
  public idMovie: number;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) {  }

  ngOnInit(): void {
    this.route.params.subscribe((datas: any) => {
      this.idMovie = datas.id;

      this.movieService.byId(datas.id).subscribe((fullmovie: MovieFull) => {
        console.log(`${JSON.stringify(fullmovie)}`);
        this.movie = fullmovie;
        this.editForm = this.formBuilder.group({
          editTitle: [
            this.movie.title, //valeur par defaut
            Validators.compose([
              Validators.required,
              Validators.minLength(2),
              Validators.maxLength(255)
            ])
          ],
          editYear: [
            this.movie.year, //valeur par defaut
            Validators.compose([
              Validators.required,
              Validators.pattern('[0-9]{4}')
            ])
          ],
          editSynopsis: [
            this.movie.synopsis, //valeur par defaut
            Validators.compose([
              Validators.required,
              Validators.minLength(2),
              Validators.maxLength(255)
            ])
          ],
          editDuration: [
            this.movie.duration, //valeur par defaut
            Validators.compose([
              Validators.required,
              Validators.minLength(2),
              Validators.maxLength(3)
            ])
          ]
        });
      });
    });
  }

  public get editTitle(): AbstractControl {
    return this.editForm.controls.editTitle;
  }
  public get editYear(): AbstractControl {
    return this.editForm.controls.editYear;
  }
  public get editSynopsis(): AbstractControl {
    return this.editForm.controls.editSynopsis;
  }
  public get editGenres(): AbstractControl {
    return this.editForm.controls.editGenre;
  }
  public get editAudiance(): AbstractControl {
    return this.editForm.controls.editAudiance;
  }
  public get editDuration(): AbstractControl {
    return this.editForm.controls.editDuration;
  }

  public update(): void {
    //console.log('uptate il faudrait')
    this.movieUpdate = this.movie;
    this.movieUpdate.title = this.editTitle.value;
    this.movieUpdate.year = this.editYear.value;
    this.movieUpdate.synopsis = this.editSynopsis.value;
    this.movieUpdate.duration = this.editDuration.value;
    // this.movieUpdate.genres = this.editGenres.value;
    // this.movieUpdate.audiance = this.editAudiance.value;
    
    this.movieService.modify(this.movieUpdate).pipe(take(1)).subscribe((response: HttpResponse<any>) => {});
  }

  public delete(): void{
    this._snackBar.open("Etes vous sure de vouloir supprimer ce film ? Cette action ne pourra pas être annulée.","Confirmation", {
      duration: 4000,
      verticalPosition:'top'
    }).onAction().pipe(take(1)).subscribe( () => {
      this.movieService.delete(this.movie).pipe(take(1)).subscribe( () => this.router.navigate(['home']) );
    })
  }

  public returnToMoviePage(): void{ 
    console.log("je retourne à ma page de film precedent ");
    this.router.navigate([`movie/${this.idMovie}`] );
  }
  
}
