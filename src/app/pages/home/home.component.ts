import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public title: string = 'movies';
  public defaultcountry: string = 'all';
  public countries: Set<string> = new Set();
  public movies: any[] = [
    {
      title: 'Joker',
      year: 2019,
      country: 'us',
      shown: true
    },
    {
      title: 'Avenger',
      year: 2018,
      country: 'fr',
      shown: true
    },
    {
      title: 'Parasite',
      year: 2012,
      country: 'us',
      shown: true
    },
    {
      title: 'Il était une fois dans la creuse...',
      year: 1984,
      country: 'fr',
      shown: true
    }
  ];

  public _fill(): void {
    this.movies.forEach((movie) => this.countries.add(movie.country));
  }

  public toggleAll(): void {
    this.defaultcountry = 'all';
    this.movies.forEach((movie: any) => {
      movie.shown = true;
    })
  }

  public toggle(country): void {
    this.defaultcountry = country;
    this.movies.forEach((movie: any) => {
      movie.shown = (movie.country == this.defaultcountry);
    })
  }
  
  constructor() {}

  ngOnInit(): void {
    this._fill();
  }

}
