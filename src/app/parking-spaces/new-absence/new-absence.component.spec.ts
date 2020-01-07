import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAbsenceComponent } from './new-absence.component';

describe('NewAbsenceComponent', () => {
  let component: NewAbsenceComponent;
  let fixture: ComponentFixture<NewAbsenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAbsenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
