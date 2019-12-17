import { ParkingSpace } from './../../shared/models/mypark.models';
import { MyparkApiService } from './../../shared/services/api/mypark-api.service';
import { Component, OnInit } from '@angular/core';
import * as uikit from 'uikit';

@Component({
  selector: 'mp-parking-spaces-list',
  templateUrl: './parking-spaces-list.component.html',
  styleUrls: ['./parking-spaces-list.component.scss']
})
export class ParkingSpacesListComponent implements OnInit {

  private _parkingSpaces: Array<ParkingSpace>;

  constructor(private apiService: MyparkApiService) { }

  ngOnInit() {
    this._parkingSpaces = [];

    this.apiService.getAllParkingSpaces().subscribe((parkingSpaces: ParkingSpace[]) => {
      this._parkingSpaces = parkingSpaces;
    });
  }

  get parkingSpaces(): Array<ParkingSpace> {
    return this._parkingSpaces;
  }

  public book(x: any): void {
    console.log('clicked', x);
    uikit.modal.alert('hallo welt');
  }

}
