import { Injectable } from '@angular/core';
import { Data } from '../models/data';
import { Subject, Observable, from } from 'rxjs';
import { Movie } from '../models/movie';
import { Person } from '../models/person';
import { partition } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  datasOb: Observable<Data[]>
  moviesOb: Observable<Movie[]>;
  personsOb: Observable<Person[]>;

  constructor() {
  }

  public split(datasObs: Observable<Data[]>) : [Observable<Movie[]>, Observable<Person[]>] {

    // datasObs.pipe(datas => {this.datasOb = from(datas); return datas;})
    // this.datasOb.pipe(partition(data => data.values.type === 'Movie'));

    return null;
  }
  
}
