import { Component, OnInit } from '@angular/core';
import * as uikit from 'uikit';

@Component({
  selector: 'mp-parking-spaces-list',
  templateUrl: './parking-spaces-list.component.html',
  styleUrls: ['./parking-spaces-list.component.scss']
})
export class ParkingSpacesListComponent implements OnInit {

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

  public book(x: any): void {
    console.log('clicked', x);
    uikit.modal.alert('hallo welt');
  }

}
