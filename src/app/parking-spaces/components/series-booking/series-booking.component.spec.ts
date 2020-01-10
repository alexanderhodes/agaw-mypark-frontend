import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesBookingComponent } from './series-booking.component';

describe('SeriesBookingComponent', () => {
  let component: SeriesBookingComponent;
  let fixture: ComponentFixture<SeriesBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeriesBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
