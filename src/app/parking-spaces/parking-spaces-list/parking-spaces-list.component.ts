import { ParkingSpace, Booking } from './../../shared/models/mypark.models';
import { MyparkApiService } from './../../shared/services/api/mypark-api.service';
import { Component, OnInit } from '@angular/core';
import * as uikit from 'uikit';

@Component({
  selector: 'mp-parking-spaces-list',
  templateUrl: './parking-spaces-list.component.html',
  styleUrls: ['./parking-spaces-list.component.scss']
})
export class ParkingSpacesListComponent implements OnInit {

  private _parkingSpaces: Array<ParkingSpace>;
  private _hasBooking: boolean;

  constructor(private apiService: MyparkApiService) {
    // ToDo: check if user already has a parking space
    this._hasBooking = false;
  }

  ngOnInit() {
    this._parkingSpaces = [];

    this.apiService.getAllParkingSpaces().subscribe((parkingSpaces: ParkingSpace[]) => {
      this._parkingSpaces = parkingSpaces;
    });
  }

  get parkingSpaces(): Array<ParkingSpace> {
    return this._parkingSpaces;
  }

  // public book(x: any): void {
  //   console.log('clicked', x);
  //   uikit.modal.alert('hallo welt');
  // }

  public book(parkingSpace?: ParkingSpace): void {
    const booking: Booking = {
      id: null,
      user: null,
      parkingSpace: parkingSpace ? parkingSpace : null,
      date: new Date(),
      bookingStatus: null
    };
    this.sendBooking(booking);
  }

  get numberOfFreeParkingSpaces(): number {
    const count = this._parkingSpaces.filter((parkingSpace: ParkingSpace) => {
      return parkingSpace.parkingSpaceStatus ? parkingSpace.parkingSpaceStatus.name = 'free' : false;
    }).length;
    return count;
  }

  get hasBooking(): boolean {
    return this._hasBooking;
  }

  private sendBooking(booking: Booking): void {
    this.apiService.createBooking(booking).subscribe((response: Booking) => {
      console.log('booking', response);
      this._hasBooking = true;
    });
  }

}
