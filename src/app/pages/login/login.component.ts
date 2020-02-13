import { Component, OnInit } from '@angular/core';
import { tap, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  public loginForm: FormGroup; 

  constructor(private formBuilder: FormBuilder) { }

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

    this.loginForm.valueChanges.pipe(
      debounceTime(400),
      map(() => {
        console.log('lancement recherche')
        this.doLogin();
      })
    ).subscribe();
  }

  public doLogin(): void {
    
  }

  public get userTerm(): AbstractControl{
    return this.loginForm.controls.searchTerm;
  }

  public get passwordTerm(): AbstractControl{
    return this.loginForm.controls.searchTerm;
  }

}
