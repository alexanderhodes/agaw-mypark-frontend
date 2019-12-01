import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mp-parkingspaces-admin',
  templateUrl: './parkingspaces-admin.component.html',
  styleUrls: ['./parkingspaces-admin.component.scss']
})
export class ParkingspacesAdminComponent implements OnInit {

  private _parkingSpaces: Array<{ number: string, status: string }>;

  constructor() { }

  ngOnInit() {
    this._parkingSpaces = [];
    for (let i = 0; i < 15; i++) {
      this._parkingSpaces.push({ number: '' + (79 + i), status: (79 + i) % 2 === 0 ? 'frei' : 'belegt' });
    }
  }

  get parkingSpaces(): Array<{ number: string, status: string }> {
    return this._parkingSpaces;
  }

  addParkingspace() {
    this._parkingSpaces.push({ number: '99', status: 'frei' });
  }

}
