import { Resolve, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { catchError, take, map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { PersonService } from '../services/person.service';

@Injectable({
    providedIn:'root'
})
export class PersonResolver implements Resolve<any> {


    public constructor(
        private personService: PersonService,
        private router: Router
    ) {}

    public resolve(
        route: import("@angular/router").ActivatedRouteSnapshot,
        state: import("@angular/router").RouterStateSnapshot
    ): Observable<any> {
        const id: number = parseInt(route.paramMap.get('id'));
        return this.personService.byId(id)
            .pipe(
                take(1),
                map((response) => { return response }),
                catchError((error: any): Observable<any> => {
                    return this._errorHandler(error);
                })
            );
    }

    private _errorHandler(error: number): Observable<any> {
        if (error === 404){
            this.router.navigate(['home'],{});
        }
        return of(null);
    }

}
