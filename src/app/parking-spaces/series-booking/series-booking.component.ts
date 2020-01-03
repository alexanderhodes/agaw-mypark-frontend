import { Component, OnInit } from '@angular/core';

export interface SeriesBookingItem {
  index: number;
  weekday: string;
  time: string;
  checked: boolean;
};

@Component({
  selector: 'mp-series-booking',
  templateUrl: './series-booking.component.html',
  styleUrls: ['./series-booking.component.scss']
})
export class SeriesBookingComponent implements OnInit {

  checked: boolean;
  seriesBookingItems: SeriesBookingItem[];

  constructor() {
    this.checked = false;

    this.seriesBookingItems = [];
    const weekDays = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"];
    let index = 0;

    weekDays.forEach((weekDay: string) => {
      this.seriesBookingItems.push({ index, weekday: weekDay, time: '', checked: false });
      index += 1;
    });
  }

  ngOnInit() {
  }

  public saveSeriesBooking() {
    console.log(this.seriesBookingItems);
  }

  public onChange(event: any): void {
    console.log('changed', event);
  }

}
