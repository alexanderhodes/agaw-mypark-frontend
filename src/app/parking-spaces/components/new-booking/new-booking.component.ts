import { Component, OnInit } from '@angular/core';
import {Booking} from '../../../shared/models/mypark.models';
import {MyparkApiService, DateService} from '../../../shared/services/public_api';

@Component({
  selector: 'mp-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrls: ['./new-booking.component.scss']
})
export class NewBookingComponent implements OnInit {

  public day: string;
  public time: string;
  public isLoading: boolean;

  // ToDo: add error message

  constructor(private apiService: MyparkApiService, private dateService: DateService) {
    this.isLoading = false;
    this.day = this.dateService.getToday();
    this.time = '08:00';
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
    this.isLoading = true;
    // send http post request and handle response if successful
    this.apiService.createBooking(booking).subscribe((response: Booking) => {
      console.log('response', response);
      if (response) {
        // alles war erfolgreich
      } else {
        // Fehler ist aufgetreten
      }
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
    });
  }

}
