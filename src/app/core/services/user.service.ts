import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _registeredUsers: any[];

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
  }

  public authenticate(user: any): boolean {
    const registeredUser:any = this._registeredUsers.find((obj:any) => (obj.userTerm == user.userTerm) && (obj.passwordTerm == user.passwordTerm));
    
    if(registeredUser !== undefined){
      localStorage.setItem(
        'user',
        JSON.stringify(user)
      );
      return true;
    }
    return false;
  }
}
