import { Component, OnInit } from '@angular/core';
import { MyparkApiService, ModalService, DateService } from '../../services/public_api';
import { Booking } from '../../models/mypark.models';
import {ModalConfiguration} from '../../models/component.models';

@Component({
  selector: 'mp-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {

  private _bookings: Booking[];
  private _deleteBooking: Booking;
  private _deleteModalBookingConfiguration: ModalConfiguration;

  public isLoading: boolean;

  constructor(private apiService: MyparkApiService,
              private modalService: ModalService,
              private dateService: DateService) {
    this._bookings = [];
    this.isLoading = false;
  }

  ngOnInit() {
    this.isLoading = true;
    this.apiService.getBookings().subscribe(bookings => {
      this._bookings = bookings;
      this.isLoading = false;
    });
  }

  get bookings(): Booking[] {
    return this._bookings;
  }

  get deleteModalBookingConfiguration(): ModalConfiguration {
    return this._deleteModalBookingConfiguration;
  }

  public deleteBooking(booking: Booking): void {
    this._deleteBooking = booking;
    const date = this.dateService.formatToGermanDate(booking.date);
    const text = `Möchten Sie die Buchung für den ${date} wirklich löschen?`;
    this._deleteModalBookingConfiguration = this.initDeleteModalBookingConfiguration(text);
    this.modalService.show(this._deleteModalBookingConfiguration.id);
  }

  public confirmDeleteBooking(event: any): void {
    this.apiService.deleteBooking(this._deleteBooking.id).subscribe((response) => {
      const index = this._bookings.findIndex((booking: Booking) => {
        return booking.id === this._deleteBooking.id;
      });

      if (index > -1) {
        this._bookings.splice(index, 1);
      }
      this._deleteBooking = null;
    });
  }

  private initDeleteModalBookingConfiguration(text: string): ModalConfiguration {
    return {
      id: 'modalDeleteBooking',
      title: 'Buchung löschen',
      text,
      closeText: 'bestätigen'
    };
  }

}
