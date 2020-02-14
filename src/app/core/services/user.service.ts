import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _registeredUsers: any[];
  public isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    this._registeredUsers= new Array<any>();
    this._registeredUsers.push(
      {
        userTerm: 'marcel',
        passwordTerm: 'password'
      },      
      {
        userTerm: 'michel',
        passwordTerm: '123456789'
      },
      {
        userTerm: 'dudule',
        passwordTerm: 'magrosse'
      }
    );
    const userAsString: string = localStorage.getItem('user');
    if (userAsString !== null) {
      this.isAuthenticated$.next(true);
    }
  }

  public authenticate(user: any): BehaviorSubject<boolean> {
    const registeredUser:any = this._registeredUsers.find((obj:any) => 
      (obj.userTerm == user.userTerm) && (obj.passwordTerm == user.passwordTerm)
    );
    
    if(registeredUser !== undefined){
      localStorage.setItem(
        'user',
        JSON.stringify(user)
      );
      this.isAuthenticated$.next(true);
    } else this.isAuthenticated$.next(false);
    
    return this.isAuthenticated$;
  }

  public logout():void {
    localStorage.removeItem('user');
    this.isAuthenticated$.next(false);
  }
}
