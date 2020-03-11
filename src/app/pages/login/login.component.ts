import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute, Navigation } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public adminToken: Observable<String>
  private _navigation: Navigation;
  private _idMovie: number;
  private _idPerson: number;
  public processing: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this._navigation = this.router.getCurrentNavigation();
  }

  public get login(): AbstractControl {
    return this.loginForm.controls.login;
  }

  public get userName(): AbstractControl {
    return this.loginForm.controls.userName;

  }

  public get password(): AbstractControl {
    return this.loginForm.controls.password;
  }

  ngOnInit(): void {

    if (this._navigation.extras && this._navigation.extras.state) {
      const state = this._navigation.extras.state ; 
      // as { movie: number };
      if (state.hasOwnProperty('movie')) {
        this._idMovie = state.movie;
      }
      if (state.hasOwnProperty('person')) {
        this._idPerson = state.person;
      }
      //console.log('navigation route state'  + JSON.stringify(this._navigation.extras.state))
    }


    this.loginForm = this.formBuilder.group({
      userName: [
        '',

        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(255)
        ])
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(255)
        ])
      ]
    });
  }



  public doLoginNewVersion(): void {
    // Local persistence of user
    this.processing = true;

    this.userService.authenticate(this.loginForm.value).then((status: boolean) => {
      this.processing = false;
      console.log('Never say never!');
      if (status) {
        if (!(this._idMovie === undefined)) {
          this.router.navigate(['../', 'movie', this._idMovie]);
        } 
        if (!(this._idPerson === undefined)) {
          this.router.navigate(['../', 'person', this._idPerson]);
        } 
        if ( (this._idMovie === undefined) && (this._idPerson === undefined) )  {
           this.router.navigate(['home']);
        } 
       
      } else {
        this._snackBar.open(
          'Sorry, your identification failed!',
          '',
          {
            duration: 2500,
            verticalPosition: 'top'
          }
        );
        this.login.setValue('');
        this.password.setValue('');
      }
    });
  }


  public goToCreateAccount(): void {
    this.router.navigate(['createAccount']);
  }

  public returnToHome(): void {
    this.router.navigate(['home']);
  }


}
