import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesAbsenceComponent } from './series-absence.component';

describe('SeriesAbsenceComponent', () => {
  let component: SeriesAbsenceComponent;
  let fixture: ComponentFixture<SeriesAbsenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeriesAbsenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
