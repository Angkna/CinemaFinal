import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title: string = 'movies';
  public defaultcountry: string = 'us';

  public movies: any[] = [
    {
      title: 'Joker',
      year: 2019,
      country: 'us'
    },
    {
      title: 'Avenger',
      year: 2018,
      country: 'us'
    },
    {
      title: 'Parasite',
      year: 2012,
      country: 'fr'
    }
  ];

  public toggleCountry(): void {
    if (this.defaultcountry == 'us') {
      this.defaultcountry = 'fr';
    } else { 
      this.defaultcountry ='us';
    }
  }
}
