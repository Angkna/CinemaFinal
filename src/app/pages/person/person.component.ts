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
import { PersonService } from 'src/app/core/services/person.service';
import { $ } from 'protractor';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  public person: Person;
  public editForm: FormGroup;


  constructor(
    private route: ActivatedRoute,
    private movieService: PersonService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe((data: { person: Person }) => {
      console.log(`Person : ${JSON.stringify(data.person)}`);
      this.person = data.person; 
      console.log(`test name $(data.person)`)
    });
  }

    public doEditPerson(): void {
    this.router.navigate(['editPerson', this.person.idPerson]);
  }

    public returnToHome(): void {
    this.router.navigate(['home']);
   }
  

}
