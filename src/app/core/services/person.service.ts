import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Person } from '../models/person';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  public persons: Observable<Person[]>;
  



// private _years: Set<number> = new Set<number>();
// public years$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>( Array.from(this._years).sort() );

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
}