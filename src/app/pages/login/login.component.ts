import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  public loginForm: FormGroup; 

  constructor(private formBuilder: FormBuilder) { }
  
  public get userTerm(): AbstractControl{
    return this.loginForm.controls.userTerm;
  }

  public get passwordTerm(): AbstractControl{
    return this.loginForm.controls.passwordTerm;
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userTerm: [
        '', 
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(255)
        ])
      ],
      passwordTerm: [
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
    console.log('Tu es connecté ! (Si jte jure !)')
  }

}
