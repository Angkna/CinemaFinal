import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/core/models/user-interface';
import { UserService } from 'src/app/core/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  public RegisterForm: FormGroup;
  private _user: UserInterface = {
    userName: '', password: '', email: ''
  };

  constructor(private _snackBar: MatSnackBar, private formBuilder: FormBuilder, private router: Router, private userService: UserService ) { }

  ngOnInit(): void {
    this.RegisterForm = this.formBuilder.group({
      username: [
        '', 
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50)
        ])
      ],
      email: [
        '', 
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
        ])
      ],
      password: [
        '', 
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(255)
        ])
      ],
      passwordConfirm: [
        '', 
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(255)
        ])
      ]
    });
  }

  public get username(): AbstractControl{
    return this.RegisterForm.controls.username;
  }

  public get email(): AbstractControl{
    return this.RegisterForm.controls.email;
  }

  public get password(): AbstractControl{
    return this.RegisterForm.controls.password;
  }

  public get passwordConfirm(): AbstractControl{
    return this.RegisterForm.controls.passwordConfirm;
  }

  public create(): void {
    if (this.password.value == this.passwordConfirm.value) {
      this._user.userName = this.username.value;
      this._user.email = this.email.value;
      this._user.password = this.password.value;
      this._user.role = 'simpleUser';
      console.log('need to create user : ' + JSON.stringify(this._user));
      this.userService.addUser(this._user);
      this._snackBar.open("Compte crée !","Succes !", {
        duration: 2500,
        verticalPosition:'top'
      })
      this.router.navigate(['login']);
    } else {
      this._snackBar.open("Champs de confirmation de mot de passe différent","Error !", {
        duration: 2500,
        verticalPosition:'top'
      })
    }
    
  }

}
