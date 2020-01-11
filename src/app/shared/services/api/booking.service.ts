import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {Booking} from '../../models/mypark.models';

@Injectable()
export class BookingService {

  constructor(private apiService: ApiService) {}

  public getBookings(): Observable<Booking[]> {
    return this.apiService.get<Booking[]>(`bookings/users`);
  }

  public createBooking(body: Booking): Observable<Booking> {
    return this.apiService.post<Booking>(`bookings`, body);
  }

  public updateBooking(id: string, body: Booking): Observable<Booking> {
    return this.apiService.put<Booking>(`bookings/${id}`, body);
  }

  public deleteBooking(id: string): Observable<any> {
    return this.apiService.delete(`bookings/${id}`);
  }

  public getBookingForToday(date: string): Observable<Booking> {
    return this.apiService.get<Booking>(`bookings/users/${date}`);
  }


}
