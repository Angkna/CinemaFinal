import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserInterface } from './../models/user-interface'
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _registeredUsers: UserInterface[];
  private _user: UserInterface = null;
  public userSubject$ : BehaviorSubject<UserInterface> = new BehaviorSubject<UserInterface>(this._user);

  constructor() {
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
        userName: 'michel',
        password: '123456789',
        isAuthenticated: false
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
      this._user = this._registeredUsers.find((obj: UserInterface) => obj.token = userAsObject.token);
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

  public authenticate(user: UserInterface): boolean {
    this._user = this._registeredUsers.find((obj:UserInterface) => 
      (obj.userName == user.userName) && (obj.password == user.password)
    );
    
    if (this._user !== undefined) {
      localStorage.setItem('user', JSON.stringify({token: this._user.token}));
      this._user.isAuthenticated = true;
    } else {
      this._user = null;
    }
    this.userSubject$.next(this._user);
    return this._user.isAuthenticated;
  }

  public logout(): void {
    localStorage.removeItem('user');
    this._user = null;
    this.userSubject$.next(this._user);
  }
}
