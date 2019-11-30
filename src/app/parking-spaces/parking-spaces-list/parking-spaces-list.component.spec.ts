import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingSpacesListComponent } from './parking-spaces-list.component';

describe('ParkingSpacesListComponent', () => {
  let component: ParkingSpacesListComponent;
  let fixture: ComponentFixture<ParkingSpacesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkingSpacesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingSpacesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
