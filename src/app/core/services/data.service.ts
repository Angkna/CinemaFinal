import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { Data } from '../models/data';
import { Movie } from '../models/movie';
import { Person } from '../models/person';
import { partition, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  constructor() {  }

  public splitData(datasOb: Observable<Data[]>): [Observable<Movie[]>, Observable<Person[]>] {
    let movies: Movie[] = [];
    let persons: Person[] = [];
    datasOb
      .pipe(take(1))
      .subscribe(datas => {
        datas.forEach(data => {
          if (data.type === 'Movie') {
            movies.push(new Movie().deserialize(data));
          } 
          if (data.type === 'Person') {
            persons.push(new Person().deserialize(data));
          }
        });
      })
    return [of(movies), of(persons)];
  }
 
}
