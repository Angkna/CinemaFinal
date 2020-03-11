import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Data } from '../models/data';
import { Movie } from '../models/movie';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class DataService {

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
