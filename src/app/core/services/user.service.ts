import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserInterface } from './../models/user-interface'
import { HttpClient, HttpResponse } from '@angular/common/http';
import { take, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Interface } from 'readline';
import { User } from '../models/user';
import { RepositionScrollStrategy } from '@angular/cdk/overlay';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user: UserInterface = { firstName: '', lastName: '', userName: '', password: '', email: '', role: '' };
  private _userC: Observable<User>;

  public userSubject$: BehaviorSubject<UserInterface> = new BehaviorSubject<UserInterface>(this._user);

  constructor(private httpClient: HttpClient) {

    const userAsString: string = localStorage.getItem('user');
    console.log("recherche token ...")
    if (userAsString !== null) {
      console.log("token trouvé !")
      const userAsObject: any = JSON.parse(userAsString);
      const apiRoute: string = `${environment.apiRoot}user/token?t=${userAsObject.token}`;
      this.httpClient.get<any>(
        apiRoute,
        { observe: 'response' }
      ).pipe(
        take(1)
      ).subscribe((response: HttpResponse<any>) => {
        if (response.status === 200 ) {
          this._user.firstName = response.body.firstName;
          this._user.lastName = response.body.lastName;
          this._user.userName = response.body.userName;
          this._user.password = null;
          this._user.email = response.body.email;
          this._user.role = response.body.role;
          this._user.movieLiked = response.body.movieLiked;
        }
        this.userSubject$.next(this._user);

      })
      this._user.token = userAsObject.token;
      this._user.isAuthenticated = true;
      this.userSubject$.next(this._user);
    }
  }

  public get user(): UserInterface {
    return this._user;
  }

  public authenticate(user: UserInterface): Promise<boolean> {
    const apiRoute: string = environment.authenticateRoot;
    const userBis = { username: user.userName, password: user.password }
    return new Promise<boolean>((resolve) => {
      this.httpClient.post<any>(apiRoute, userBis, { observe: 'response' }).pipe(
        take(1)
      ).subscribe((response: HttpResponse<any>) => {
        if (response.status === 200) {
          localStorage.setItem('user', JSON.stringify({ token: response.body.jwtToken }));
          resolve(true);
          // this._user = user;
          // this._user.password = null;
          // this._user.token = response.body.jwttoken;
          // this._user.isAuthenticated = true;
          // this.userSubject$.next(this._user);
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

  public addUser(user: UserInterface) : Promise < HttpResponse < any >> {
    const apiRoute: string = `${environment.apiRoot}user`;
    return this.httpClient.post<any>(apiRoute, user, { observe: 'response' })
      .pipe(take(1))
      .toPromise().catch(error => { return new Promise<HttpResponse<any>>(resolve => resolve(error)) });
  }

  public updateUserFromToken(token:string): void {
    const apiRoute: string = `${environment.apiRoot}user/token?t=${token}`;
    this.httpClient.get<any>(
      apiRoute,
      { observe: 'response' }
    ).pipe(
      take(1)
    ).subscribe((response: HttpResponse<any>) => {
      if (response.status === 200 ) {
        this._user = response.body;
        this._user.password = null;
        // this._user.email = response.body.email;
        // this._user.role = response.body.role;
        // this._user.movieLiked = response.body.movieLiked;
        this.userSubject$.next(this._user);
      }
    })
  }

  public ByUsername(username: string): Observable<User> {
      const apiRoute: string = `${environment.apiRoot}user/username?u=${username}`;
      return this.httpClient
      .get<any[]>(apiRoute, {observe: 'response'})
      .pipe(
        take(1),
        map((reponse) => new User().deserialize(reponse.body))
        );
  }
}
