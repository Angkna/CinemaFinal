import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private userService: UserService) { }
  
  intercept(req: import("@angular/common/http").HttpRequest<any>, next: import("@angular/common/http").HttpHandler): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {
    
    let token: String = null;

    if (this.userService.user){
      token = this.userService.user.token;
    }

    if (token) {
      const bearer: string = "Bearer " + token;
      const newRequest: HttpRequest<any> = req.clone({
        setHeaders : {
          Authorization : bearer
        }
      });
      //requete update with token
      return next.handle(newRequest);
    }

    //requete d'origine
    return next.handle(req);
  }
}
