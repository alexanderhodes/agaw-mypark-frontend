import { Component, OnInit } from '@angular/core';
import {Booking} from '../../shared/models/mypark.models';
import {MyparkApiService} from '../../shared/services/api/mypark-api.service';

@Component({
  selector: 'mp-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrls: ['./new-booking.component.scss']
})
export class NewBookingComponent implements OnInit {

  day: string;
  time: string;

  // ToDo: add error message

  constructor(private apiService: MyparkApiService) {
    this.day = Intl.DateTimeFormat('de-de').format(new Date());
  }

  ngOnInit() {
  }

  public createBooking(): void {
    // ToDo: check input fields
    const date = new Date(`${this.day} ${this.time}`);

    // create booking by interface
    const booking: Booking = {
      id: null,
      user: null,
      parkingSpace: null,
      date,
      bookingStatus: null
    };
    console.log('date', this.day, 'time', this.time, 'bookingDate', date);
    // send http post request and handle response if successful
    this.apiService.createBooking(booking).subscribe((response: Booking) => {
      console.log('response', response);
      if (response) {
        // alles war erfolgreich
      } else {
        // Fehler ist aufgetreten
      }
    });
  }

}
