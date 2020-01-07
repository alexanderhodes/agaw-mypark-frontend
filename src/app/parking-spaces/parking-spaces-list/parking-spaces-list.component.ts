import {ParkingSpace, Booking, Problem} from './../../shared/models/mypark.models';
import {MyparkApiService, ModalService, ApiService, AuthService} from './../../shared/services/public_api';
import { Component, OnInit } from '@angular/core';
import { ModalConfiguration } from '../../shared/models/component.models';

@Component({
  selector: 'mp-parking-spaces-list',
  templateUrl: './parking-spaces-list.component.html',
  styleUrls: ['./parking-spaces-list.component.scss']
})
export class ParkingSpacesListComponent implements OnInit {

  public isLoading: boolean;

  private _parkingSpaces: Array<ParkingSpace>;
  private _hasBooking: boolean;
  private _problem: Problem;

  private _bookNowModalConfiguration: ModalConfiguration;
  private _problemModalConfiguration: ModalConfiguration;

  constructor(private apiService: MyparkApiService, private modalService: ModalService,
              private authService: AuthService) {
    this._hasBooking = true;
    this.isLoading = false;
  }

  ngOnInit() {
    this.isLoading = true;
    this._parkingSpaces = [];

    this.apiService.getAllParkingSpaces().subscribe((parkingSpaces: ParkingSpace[]) => {
      this._parkingSpaces = parkingSpaces;
      this.isLoading = false;
    });

    const date = new Date().toLocaleDateString('de-de', { year: 'numeric', month: '2-digit', day: '2-digit' });
    this.apiService.getBookingForToday(date).subscribe(booking => {
      this._hasBooking = booking || this._hasBooking ? true : false;
    });

    this._hasBooking = this._hasBooking ? this.authService.parkingSpace : false;
  }

  get parkingSpaces(): Array<ParkingSpace> {
    return this._parkingSpaces;
  }

  get bookNowModalConfiguration(): ModalConfiguration {
    return this._bookNowModalConfiguration;
  }

  get problemModalConfiguration(): ModalConfiguration {
    return this._problemModalConfiguration;
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
    const text = parkingSpace.parkingSpaceStatus.name === 'free' ? 'Option A: frei' : 'Option B: belegt';
    const reason = parkingSpace.parkingSpaceStatus.name === 'free' ? 'status free is used' : 'status used is free';

    this._problem = {
      id: null,
      date: new Date(),
      parkingSpace,
      reason,
      user: null
    };

    this._problemModalConfiguration = this.initProblemModalConfiguration(text);
    this.modalService.show(this._problemModalConfiguration.id);
  }

  public confirmBooking(event: any): void {
    // nothing to do
  }

  public confirmProblem(event: any): void {
    // send request
    this.apiService.createProblem(this._problem).subscribe((problem: Problem) => {
      console.log('problem', problem);
      // maybe send user feedback
    });
  }

  private sendBooking(booking: Booking): void {
    this.apiService.createBooking(booking).subscribe((response: Booking) => {
      const text = `Ihnen steht für heute ab sofort der Parkplatz mit der Nummer ${booking.parkingSpace.number} zur Verfügung.`;
      this._hasBooking = true;
      this._bookNowModalConfiguration = this.initBookNowModalConfiguration(text);
      this.modalService.show(this._bookNowModalConfiguration.id);

      // ToDo: change ps status to not free
    });
  }

  private initBookNowModalConfiguration(text: string): ModalConfiguration {
    return {
      id: 'modelBooking',
      title: 'Sofort-Buchung',
      text,
      closeText: 'schließen'
    };
  }

  private initProblemModalConfiguration(text: string): ModalConfiguration {
    return {
      id: 'modalProblem',
      title: 'Problem melden',
      text,
      closeText: 'abschicken'
    };
  }

}
