import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WebSocketSubject } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Person } from 'src/app/core/models/person';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  // public actors: Actors[];
  // public director: Director;
  public personsOb: Observable<Person[]>;
  public name: string;
  public editForm: FormGroup;
  private socket$: WebSocketSubject<any>;
  public serverMessages: any[];


  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,

    private httpClient: HttpClient,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    // this.socket$ = new WebSocketSubject<any>(environment.wssAddress);
    // this.socket$.subscribe(
    //   (message) => {
    //     console.log('Le serveur envoie : ' + JSON.stringify(message) + ' message.idPerson = ' + message.idPerson);
    //     this.personsOb = this.personsOb.pipe(
    //       map((persons:Person[]): Person[] => {
    //         persons.forEach((person:Person, index:number) => {
    //           if (message.idPerson == person.idPerson) {
    //             persons[index] = message;
    //           };
    //         });
    //         return persons;
    //       })
    //     )
    //   },
    //   (err) => console.error('Erreur levée : ' + JSON.stringify(err)),
    //   () => console.warn('Completed!')
    // );    

   

    // this.moviesOb = this.movieService.all();

    // this.userService.userSubject$.subscribe((user: UserInterface) => {
    //   this.user = user;
    // });
    // this.movieService.years$.subscribe((_years) => {
    //   this.years = _years;
    // });
  }

}
