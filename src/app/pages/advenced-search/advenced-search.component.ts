import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/core/services/movie.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-advenced-search',
  templateUrl: './advenced-search.component.html',
  styleUrls: ['./advenced-search.component.scss']
})
export class AdvencedSearchComponent implements OnInit {

  public advencedSearchForm: FormGroup;

  constructor(private movieService: MovieService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.advencedSearchForm = this.formBuilder.group({
      searchTitle: [
        '', 
        Validators.compose([
          Validators.minLength(2),
          Validators.maxLength(255)
        ])
      ],
      searchYear: [
        '', 
        Validators.compose([
          Validators.pattern("[0-9]{4}")
        ])
      ],
      searchPerson: [
        '', 
        Validators.compose([
          Validators.minLength(2),
          Validators.maxLength(80)
        ])
      ]
    });
  }

  public get searchTitle(): AbstractControl {
    return this.advencedSearchForm.controls.searchTitle;
  }
  public get searchYear(): AbstractControl {
    return this.advencedSearchForm.controls.searchYear;
  }
  public get searchPerson(): AbstractControl {
    return this.advencedSearchForm.controls.searchPerson;
  }

  public validSearch(): void {
    console.log("Recherche lancé au backend !")
  }
}
