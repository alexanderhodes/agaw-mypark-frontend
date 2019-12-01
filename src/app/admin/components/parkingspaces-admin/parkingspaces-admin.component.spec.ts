import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingspacesAdminComponent } from './parkingspaces-admin.component';

describe('ParkingspacesAdminComponent', () => {
  let component: ParkingspacesAdminComponent;
  let fixture: ComponentFixture<ParkingspacesAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkingspacesAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingspacesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
