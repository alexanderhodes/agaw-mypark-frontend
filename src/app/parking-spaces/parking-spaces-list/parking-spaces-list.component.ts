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
    this._parkingSpaces.push({ number: '79', status: 'frei' });
    this._parkingSpaces.push({ number: '80', status: 'belegt' });
    this._parkingSpaces.push({ number: '81', status: 'frei' });
    this._parkingSpaces.push({ number: '82', status: 'frei' });
    this._parkingSpaces.push({ number: '83', status: 'frei' });
  }

  get parkingSpaces(): Array<{ number: string, status: string }> {
    return this._parkingSpaces;
  }

  public book(x: any): void {
    console.log('clicked', x);
    uikit.modal.alert('hallo welt');
  }

}
