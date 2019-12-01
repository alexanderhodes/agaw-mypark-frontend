import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mp-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {

  private _bookings: Array<{ date: string, time: string, status: string, parkingspace: string }>;

  constructor() { }

  ngOnInit() {
    this._bookings = [];

    for (let i = 0; i < 10; i++) {
      this._bookings.push({
        date: 1 + '' + i + '.12.2019',
        time: '07:00',
        status: (i > 3) ? 'angefragt' : 'reserviert',
        parkingspace: (i <= 3) ? `${79 + i}` : ''
      });
    }
  }

  get bookings(): Array<{ date: string, time: string, status: string, parkingspace: string }> {
    return this._bookings;
  }

}
