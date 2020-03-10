import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/core/services/movie.service';
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
  public movieUpdate: MovieFull;
  public editForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe((data: { movie: MovieFull }) => {
      console.log(`Full movie : ${JSON.stringify(data.movie)}`);
      this.movie = data.movie; //on recup le movie que l'on a déja GET dans le movie-resolver
    });
  }

    public doEdit(): void {
    this.router.navigate(['editMovie', this.movie.idMovie]);
  }

    public returnToHome(): void {
    this.router.navigate(['home']);
  }
}
