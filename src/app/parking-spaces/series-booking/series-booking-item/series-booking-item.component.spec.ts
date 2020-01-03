import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesBookingItemComponent } from './series-booking-item.component';

describe('SeriesBookingItemComponent', () => {
  let component: SeriesBookingItemComponent;
  let fixture: ComponentFixture<SeriesBookingItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeriesBookingItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesBookingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
