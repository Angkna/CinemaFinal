import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) { }

  
  public get userName(): AbstractControl{
    return this.loginForm.controls.userName;

  }

  public get password(): AbstractControl{
    return this.loginForm.controls.password;
  }

  ngOnInit(): void {
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

  public doLogin(): void {
    //local persistance of user
    this.userService.authenticate(this.loginForm.value).then((status: boolean) => {
      if (status) {
        //user exist, on redirige vers home ou vers la page consulté avant
        this.route.paramMap.subscribe( (param) => {
          let id:Number = parseInt(param.get('id'));
          if ( !Object.is(id, NaN) ) {
            this.router.navigate(['movie', id]);
          } else {
            this.router.navigate(['home']);
          }
        });
      } else {
        this.userName.setValue('');
        this.password.setValue('');
        this._snackBar.open("Désolé, identifiants incorrects.","Error", {
          duration: 2500,
          verticalPosition:'top'
        });
      }
    })
  }

  public goToCreateAccount(): void {
    this.router.navigate(['createAccount']);
  }

}
