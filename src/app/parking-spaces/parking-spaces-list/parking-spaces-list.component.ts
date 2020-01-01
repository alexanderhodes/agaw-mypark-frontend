import { ParkingSpace, Booking } from './../../shared/models/mypark.models';
import { MyparkApiService } from './../../shared/services/api/mypark-api.service';
import { Component, OnInit } from '@angular/core';
import {ModalService} from '../../shared/services/common/modal.service';

@Component({
  selector: 'mp-parking-spaces-list',
  templateUrl: './parking-spaces-list.component.html',
  styleUrls: ['./parking-spaces-list.component.scss']
})
export class ParkingSpacesListComponent implements OnInit {

  private _parkingSpaces: Array<ParkingSpace>;
  private _hasBooking: boolean;

  private _idBookNow: string;
  private _titleBookNow: string;
  private _textBookNow: string;
  private _idProblem: string;
  private _titleProblem: string;
  private _textProblem: string;
  private _closeTextProblem: string;

  constructor(private apiService: MyparkApiService, private modalService: ModalService) {
    this._hasBooking = true;
    this._idBookNow = 'confirmationModal';
    this._titleBookNow = 'Sofort-Buchung';
    this._textBookNow = '';

    this._idProblem = 'confirmationProblem';
    this._titleProblem = 'Problem melden';
    this._textProblem = '';
    this._closeTextProblem = 'abschicken';
  }

  ngOnInit() {
    this._parkingSpaces = [];

    this.apiService.getAllParkingSpaces().subscribe((parkingSpaces: ParkingSpace[]) => {
      this._parkingSpaces = parkingSpaces;
    });

    const date = new Date().toLocaleDateString('de-de', { year: 'numeric', month: '2-digit', day: '2-digit' });
    this.apiService.getBookingForToday(date).subscribe(booking => {
      this._hasBooking = booking ? true : false;
    });
  }

  get parkingSpaces(): Array<ParkingSpace> {
    return this._parkingSpaces;
  }

  get idBookNow(): string {
    return this._idBookNow;
  }

  get titleBookNow(): string {
    return this._titleBookNow;
  }

  get textBookNow(): string {
    return this._textBookNow;
  }

  get idProblem(): string {
    return this._idProblem;
  }

  get titleProblem(): string {
    return this._titleProblem;
  }

  get textProblem(): string {
    return this._textProblem;
  }

  get closeTextProblem(): string {
    return this._closeTextProblem;
  }

  get numberOfFreeParkingSpaces(): number {
    const count = this._parkingSpaces.filter((parkingSpace: ParkingSpace) => {
      return parkingSpace.parkingSpaceStatus ? parkingSpace.parkingSpaceStatus.name = 'free' : false;
    }).length;
    return count;
  }

  get hasBooking(): boolean {
    return this._hasBooking;
  }

  public book(parkingSpace?: ParkingSpace): void {
    const booking: Booking = {
      id: null,
      user: null,
      parkingSpace: parkingSpace ? parkingSpace : null,
      date: new Date(),
      bookingStatus: null
    };

    this.sendBooking(booking);
  }

  public reportProblem(parkingSpace: ParkingSpace): void {
    this._textProblem = parkingSpace.parkingSpaceStatus.name === 'free' ? 'Option A: frei' : 'Option B: belegt';

    this.modalService.show(this._idProblem);
  }

  public confirmBooking(event: any): void {
    console.log(`confirm`, event);
  }

  public confirmProblem(event: any): void {
    console.log(`confirm`, event);
  }

  private sendBooking(booking: Booking): void {
    this.apiService.createBooking(booking).subscribe((response: Booking) => {
      this._hasBooking = true;
      this._textBookNow = `Ihnen steht für heute ab sofort der Parkplatz mit der Nummer ${booking.parkingSpace.number} zur Verfügung.`;
      this.modalService.show(this._idBookNow);
    });
  }

}
