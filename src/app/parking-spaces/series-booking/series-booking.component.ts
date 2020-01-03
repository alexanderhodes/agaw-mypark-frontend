import { Component, OnInit } from '@angular/core';
import {SeriesBooking} from '../../shared/models/mypark.models';
import {MyparkApiService} from '../../shared/services/api/mypark-api.service';

@Component({
  selector: 'mp-series-booking',
  templateUrl: './series-booking.component.html',
  styleUrls: ['./series-booking.component.scss']
})
export class SeriesBookingComponent implements OnInit {

  seriesBookingItems: SeriesBooking[];
  weekdays: string[];

  private isInitial: boolean;

  constructor(private apiService: MyparkApiService) {
    this.seriesBookingItems = [];
    this.weekdays = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"];
    this.isInitial = false;
  }

  ngOnInit() {
    this.apiService.getSeriesBookings().subscribe((seriesBookings: SeriesBooking[]) => {
      if (!seriesBookings || seriesBookings.length === 0) {
        for (let i = 1; i <= 5; i++) {
          this.seriesBookingItems.push({ id: null, weekday: i, time: '', active: false, user: null });
        }
        this.isInitial = true;
      } else {
        this.seriesBookingItems = seriesBookings.sort((a: SeriesBooking, b: SeriesBooking) => {
          return a.weekday - b.weekday;
        });
        this.isInitial = false;
      }
    });
  }

  public saveSeriesBooking() {
    console.log(this.seriesBookingItems);

    if (this.isInitial) {
      // values we're not received from backend
      this.apiService.createSeriesBooking(this.seriesBookingItems).subscribe((response: SeriesBooking[]) => {
        console.log('create response', response);
      });
    } else {
      this.apiService.updateSeriesBooking(this.seriesBookingItems).subscribe((response: SeriesBooking[]) => {
        console.log('update response', response);
      });
    }

  }

  public onChange(event: any): void {
    console.log('changed', event);
  }

}
