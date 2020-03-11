import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserInterface } from './../models/user-interface'
import { HttpClient, HttpResponse } from '@angular/common/http';
import { take, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user: UserInterface = { userName: '', password: '', email: '', role: ''};

  public userSubject$ : BehaviorSubject<UserInterface> = new BehaviorSubject<UserInterface>(this._user);

  constructor(private httpClient: HttpClient) {

    const userAsString: string = localStorage.getItem('user');
    console.log("recherche token ...")
    if (userAsString !== null) {
      console.log("token trouvé !")
      const userAsObject: any = JSON.parse(userAsString);
      const apiRoute: string = `${environment.apiRoot}user/token?t=${userAsObject.token}`;
      this.httpClient.get<any>(apiRoute).pipe(
        take(1)
      ).subscribe((user) => {
        console.log("Reponse : " + JSON.stringify(user));
        this._user.userName = user.userName;
        this._user.password = user.password;
        this._user.email = user.email;
        this._user.role = user.role;
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
    const userBis = { username: user.userName, password: user.password, email: user.email, role: user.role }
    return new Promise<boolean> ((resolve) => {
       this.httpClient.post<any>(apiRoute, userBis, {observe:'response'}).pipe(
      take(1)
      ).subscribe((response:HttpResponse<any>) => {
        if (response.status === 200) {
          localStorage.setItem('user', JSON.stringify({token: response.body.jwtToken}));
          console.log("la reponse body est :" + JSON.stringify(response.body));
          this._user = user;
          console.log('user = ' + JSON.stringify(user));
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

  public addUser(user: UserInterface) :Promise<HttpResponse<any>>{
    const apiRoute: string = `${environment.apiRoot}user`;
    return this.httpClient.post<any>(apiRoute, user, {observe: 'response'})
          .pipe(take(1))
          .toPromise().catch(error => {return new Promise<HttpResponse<any>>(resolve => resolve(error))});
  }

}
