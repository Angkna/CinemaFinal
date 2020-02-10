import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
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
      country: 'us',
      shown: true
    },
    {
      title: 'Parasite',
      year: 2012,
      country: 'fr',
      shown: true
    },
    {
      title: 'Il était une fois dans la creuse...',
      year: 1984,
      country: 'fr',
      shown: true
    }
  ];

  public constructor() {
    this._fill();
  }

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

  
}

