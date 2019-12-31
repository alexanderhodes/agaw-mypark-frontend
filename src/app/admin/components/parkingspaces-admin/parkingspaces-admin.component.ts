import { ParkingSpace } from './../../../shared/models/mypark.models';
import { Component, OnInit } from '@angular/core';
import { MyparkApiService } from 'src/app/shared/services/api/mypark-api.service';

@Component({
  selector: 'mp-parkingspaces-admin',
  templateUrl: './parkingspaces-admin.component.html',
  styleUrls: ['./parkingspaces-admin.component.scss']
})
export class ParkingspacesAdminComponent implements OnInit {

  private _parkingSpaces: ParkingSpace[];
  number: string;

  constructor(private apiService: MyparkApiService) {
    this._parkingSpaces = [];
  }

  ngOnInit() {
    this._parkingSpaces = [];

    this.apiService.getAllParkingSpaces().subscribe((parkingSpaces: ParkingSpace[]) => {
      this._parkingSpaces = parkingSpaces;
    });
  }

  get parkingSpaces(): ParkingSpace[] {
    return this._parkingSpaces;
  }

  addParkingspace() {
    const parkingSpace: ParkingSpace = { number: this.number };
    this.apiService.createParkingSpace(parkingSpace).subscribe((ps: ParkingSpace) => {
      console.log('ps', ps);
      this._parkingSpaces.push(ps);
      this.number = '';
      this._parkingSpaces = this._parkingSpaces.sort((a, b) => {
        return +a.number - +b.number;
      });
    }, error => {
      // ToDo: handle error
    });
  }

}
