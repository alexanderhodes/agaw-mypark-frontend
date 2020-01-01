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

  private _id: string;
  private _title: string;
  private _text: string;

  constructor(private apiService: MyparkApiService) {
    // ToDo: check if user already has a parking space
    this._hasBooking = true;
    this._id = 'confirmationModal';
    this._title = 'Sofort-Buchung';
    this._text = '';
  }

  ngOnInit() {
    this._parkingSpaces = [];

    this.apiService.getAllParkingSpaces().subscribe((parkingSpaces: ParkingSpace[]) => {
      this._parkingSpaces = parkingSpaces;
    });

    const date = new Date().toLocaleDateString('de-de', { year: 'numeric', month: '2-digit', day: '2-digit' });
    this.apiService.getBookingForToday(date).subscribe(booking => {
      this._hasBooking = booking ? true : false;
    });
  }

  get parkingSpaces(): Array<ParkingSpace> {
    return this._parkingSpaces;
  }

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get text(): string {
    return this._text;
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

  private sendBooking(booking: Booking): void {
    this.apiService.createBooking(booking).subscribe((response: Booking) => {
      this._hasBooking = true;
      uikit.modal('#confirmationModal').show();
      this._text = `Ihnen steht für heute ab sofort der Parkplatz mit der Nummer ${response.parkingSpace.number} zur Verfügung.`;
    });
  }

}
