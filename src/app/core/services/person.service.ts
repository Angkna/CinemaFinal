import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { Person } from '../models/person';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { take, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  public persons: Observable<Person[]>;
  
private _birthdate: Set<number> = new Set<number>();
public birthdate$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>( Array.from(this._birthdate).sort() );

constructor(private httpClient: HttpClient) { }

public all() : Observable<Person[]> {
  const apiRoute: string = `${environment.apiRoot}person`;
  this.persons = this.httpClient.get<any[]>(apiRoute).pipe(
    take(1),
    map(
      (reponse) => {
        return reponse.map((item => {
          return new Person().deserialize(item)
        }))
      }
    )
  );
  return this.persons? this.persons:of([]);
}

public byId(id: number) : Observable<Person> {
  const apiRoute: string = `${environment.apiRoot}person/${id}`;
  return this.httpClient
    .get<any>(apiRoute,{observe: 'response'})
    .pipe(
      take(1),
      map( (reponse) => new Person().deserialize(reponse.body) ),
      catchError( (error:any) => {
        console.log(`Something went wrong : ${JSON.stringify(error)}`);
        return throwError(error.status);        
      })
    ); 
}

public byName(search: string) : Observable<Person[]> {
    const apiRoute: string = `${environment.apiRoot}person/byNamePartial?n=${search}`;
    this.persons = this.httpClient.get<any[]>(apiRoute).pipe(
      take(1),
      map(
        (reponse) => {
          return reponse.map((item => {
            return new Person().deserialize(item)
          }))
        }
      )
    );
    return this.persons? this.persons:of([]);
  }

  public modify(personUpdated: Person) : Observable<HttpResponse<any>> {
    const apiRoute: string = `${environment.apiRoot}person/modify`;
    console.log('person updated !')
    return this.httpClient.put<any>(apiRoute, personUpdated, {observe: 'response'})
          .pipe(
            take(1),
            map((response: HttpResponse<any>) => {
              return response;
            }));
  }

  public delete(person: Person) : Observable<HttpResponse<any>> {
    const apiRoute: string = `${environment.apiRoot}person/${person.idPerson}`;
    return this.httpClient.delete<any>(apiRoute, {observe: 'response'})
          .pipe(
            take(1),
            map((response: HttpResponse<any>) => {
              return response;
            }));
  }



}