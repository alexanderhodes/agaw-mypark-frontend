import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {SeriesBooking} from '../../models/mypark.models';
import {Observable} from 'rxjs';

@Injectable()
export class SeriesBookingService {

  constructor(private apiService: ApiService) { }

  public createSeriesBooking(body: SeriesBooking[]): Observable<SeriesBooking[]> {
    return this.apiService.post<SeriesBooking[]>(`seriesbookings`, body);
  }

  public getSeriesBookings(): Observable<SeriesBooking[]> {
    return this.apiService.get<SeriesBooking[]>(`seriesbookings`);
  }

  public updateSeriesBooking(body: SeriesBooking[]): Observable<SeriesBooking[]> {
    return this.apiService.put<SeriesBooking[]>(`seriesbookings`, body);
  }

}

