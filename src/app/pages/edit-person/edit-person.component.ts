import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/core/models/person';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from 'src/app/core/services/person.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.scss']
})
export class EditPersonComponent implements OnInit {

  public person : Person;
  public personUpdate: Person;
  public editForm: FormGroup;
  public idPerson: number;

  constructor(
    private route: ActivatedRoute,
    private personService: PersonService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((datas: any) => {
      this.idPerson = datas.id;

      this.personService.byId(datas.id).subscribe((person: Person) => {
        console.log(`${JSON.stringify(person)}`);
        this.person = person;
        this.editForm = this.formBuilder.group({
          editName: [
            this.person.name, //valeur par defaut
            Validators.compose([
              Validators.required,
              Validators.minLength(2),
              Validators.maxLength(255)
            ])
          ],
          editBirthdate: [
            this.person.birthdate, //valeur par defaut
            Validators.compose([
              Validators.required,
             //Validators.pattern('[0-9]{4}')
            ])
          ],
          editBio: [
            this.person.biography, //valeur par defaut
            Validators.compose([
              Validators.required,
              Validators.minLength(2),
              Validators.pattern('255')
            ])
          ]
        });
      });
    });
  }

  public get editName(): AbstractControl {
    return this.editForm.controls.editName;
  }
  public get editBirthdate(): AbstractControl {
    return this.editForm.controls.editBirthdate;
  }
  public get editBio(): AbstractControl {
    return this.editForm.controls.editBio;
  }

  public update(): void {
    this.personUpdate = this.person;
    this.personUpdate.name = this.editName.value;
    this.personUpdate.birthdate = this.editBirthdate.value;
    // TODO
    // this.personService.modify(this.personUpdate).pipe(take(1)).subscribe((response: HttpResponse<any>) => {});
  }


  public deletePerson(): void{
    this._snackBar.open("Etes vous sure de vouloir supprimer cette personne ? Cette action ne pourra pas être annulée.","Confirmation", {
      duration: 4000,
      verticalPosition:'top'
    }).onAction().pipe(take(1)).subscribe( () => {
      // TODO
      // this.personService.delete(this.person).pipe(take(1)).subscribe( () => this.router.navigate(['home']) );
    })
  }

  public returnToPersonPage(): void{ 
    console.log("je retourne à ma page de gens precedent ");
   this.router.navigate([`person/${this.idPerson}`] );
  }
}
