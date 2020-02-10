import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title: string = 'movies';
  public defaultcountry: string = 'all';

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

  public toggleAll(): void {
    this.defaultcountry = 'all';
    this.movies.forEach((movie: any) => {
      movie.shown = true;
    })
  }

  public toggleUS(): void {
    this.defaultcountry = 'us';
    this.movies.forEach((movie: any) => {
      movie.shown = (movie.country == this.defaultcountry);
    })
  }

  public toggleFR(): void {
    this.defaultcountry = 'fr';
    this.movies.forEach((movie: any) => {
      movie.shown = (movie.country == this.defaultcountry);
    })
  }
  
  public toggleES(): void {
    this.defaultcountry = 'es';
    this.movies.forEach((movie: any) => {
      movie.shown = (movie.country == this.defaultcountry);
    })
  }
}
