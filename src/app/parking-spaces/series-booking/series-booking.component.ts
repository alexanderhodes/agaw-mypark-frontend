import { Component, OnInit } from '@angular/core';
import {SeriesBooking} from '../../shared/models/mypark.models';
import {MyparkApiService} from '../../shared/services/api/mypark-api.service';

@Component({
  selector: 'mp-series-booking',
  templateUrl: './series-booking.component.html',
  styleUrls: ['./series-booking.component.scss']
})
export class SeriesBookingComponent implements OnInit {

  public seriesBookingItems: SeriesBooking[];
  public weekdays: string[];
  public success: boolean;
  public message: string;
  public isLoading: boolean;

  private isInitial: boolean;

  constructor(private apiService: MyparkApiService) {
    this.seriesBookingItems = [];
    this.weekdays = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];
    this.isInitial = false;
    this.isLoading = false;
  }

  ngOnInit() {
    this.isLoading = true;
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
      this.isLoading = false;
    });
  }

  public saveSeriesBooking(): void {
    if (this._validateSeriesBookings()) {
      this.isLoading = true;
      if (this.isInitial) {
        // values we're not received from backend
        this.apiService.createSeriesBooking(this.seriesBookingItems).subscribe((response: SeriesBooking[]) => {
          this.success = true;
          this.message = 'Die Serienbuchungen wurden erfolgreich angelegt.';
          this.isLoading = false;
        });
      } else {
        this.apiService.updateSeriesBooking(this.seriesBookingItems).subscribe((response: SeriesBooking[]) => {
          this.success = true;
          this.message = 'Die Änderungen wurden erfolgreich gespeichert.';
          this.isLoading = false;
        });
      }
    } else {
      this.success = false;
      this.message = 'Bei einer der aktiven Serienbuchungen ist keine Uhrzeit hinterlegt worden.';
      this.isLoading = false;
    }
  }

  private _validateSeriesBookings(): boolean {
    let success = true;
    this.seriesBookingItems.forEach((seriesBooking: SeriesBooking) => {
      if (seriesBooking.active && !seriesBooking.time) {
        success = false;
      }
    });
    return success;
  }

}
