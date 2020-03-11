import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvencedSearchComponent } from './advenced-search.component';

describe('AdvencedSearchComponent', () => {
  let component: AdvencedSearchComponent;
  let fixture: ComponentFixture<AdvencedSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvencedSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvencedSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
