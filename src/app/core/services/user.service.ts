import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserInterface } from './../models/user-interface'
import { Movie } from '../models/movie';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _registeredUsers: UserInterface[];
  private _admin: Object;
  private _user: UserInterface = null;
  public userSubject$ : BehaviorSubject<UserInterface> = new BehaviorSubject<UserInterface>(this._user);

  constructor(private httpClient: HttpClient) {
    this._admin = {username: 'administrator', password: 'password'}
    this._registeredUsers = new Array<UserInterface>();
    this._registeredUsers.push(
      {
        userName: 'marcel',
        password: 'password',
        token: '1234',
        isAuthenticated: false,
        likedMovie: new Set<Movie>()
      },      
      {
        userName: 'dudule',
        password: 'magrosse',
        token: '0000',
        isAuthenticated: false,
        likedMovie: new Set<Movie>()
      }
    );
    
    const userAsString: string = localStorage.getItem('user');
    if (userAsString !== null) {
      const userAsObject: any = JSON.parse(userAsString);
      this._user = this._registeredUsers.find((user: UserInterface) => user.token = userAsObject.token);
      if (this._user !== undefined) {
        this._user.isAuthenticated = true;
      } else {
        this._user = null;
      }
    }
    this.userSubject$.next(this._user);
  }

  public get user(): UserInterface {
    return this._user;
  }

  public authenticate(user: UserInterface): Promise<boolean> {    
    const apiRoute: string = `http://localhost:8080/authenticate`;
    return new Promise<boolean> ((resolve) => {
       this.httpClient.post<any>(apiRoute, user, {observe:'response'}).pipe(
      take(1)
    ).subscribe((response:HttpResponse<any>) => {
      if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify({token: response.body.jwtToken}));
        this._user = user;
        this._user.token = response.body.jwttoken
        this._user.isAuthenticated = true;
        resolve(true);
        this.userSubject$.next(this._user);
      } 
    }, (error) => {
      this._user = null;
      resolve(false);
      this.userSubject$.next(this._user);
      console.log(error);
    });
  })
}

  public logout(): void {
    localStorage.removeItem('user');
    this._user = null;
    this.userSubject$.next(this._user);
  }
}
