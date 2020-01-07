import { Component, OnInit } from '@angular/core';
import { MyparkApiService } from '../../services/api/mypark-api.service';
import { Booking } from '../../models/mypark.models';

@Component({
  selector: 'mp-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {

  private _bookings: Booking[];

  public isLoading: boolean;

  constructor(private apiService: MyparkApiService) {
    this._bookings = [];
    this.isLoading = false;
  }

  ngOnInit() {
    this.isLoading = true;
    this.apiService.getBookings().subscribe(bookings => {
      this._bookings = bookings;
      this.isLoading = false;
    });
  }

  get bookings(): Booking[] {
    return this._bookings;
  }

}
